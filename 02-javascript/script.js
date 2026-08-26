const users = [
  {
    id: 1,
    name: "山田 太郎",
    role: "フロントエンドエンジニア",
    description: "UI実装とアクセシビリティ改善が得意です。",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "佐藤 花子",
    role: "バックエンドエンジニア",
    description: "API設計とデータベース設計を担当しています。",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "鈴木 健",
    role: "デザイナー",
    description: "情報設計とデザインシステム構築が得意です。",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "高橋 美咲",
    role: "QAエンジニア",
    description: "テスト設計と品質改善を推進しています。",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "伊藤 翔",
    role: "フロントエンドエンジニア",
    description: "JavaScriptのパフォーマンス改善が得意です。",
    imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "中村 葵",
    role: "プロジェクトマネージャー",
    description: "進行管理とチーム連携の最適化を担当しています。",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80"
  }
];

// TODO: 必要なHTML要素を取得してください
// 例: document.querySelector("#cardList")
const cardListElement = document.querySelector("#cardList");
const resultCountElement = document.querySelector("#resultCount");
const emptyMessageElement = document.querySelector("#emptyMessage");
const profileCardTemplate = document.querySelector("#profileCardTemplate");
const searchInputElement = document.querySelector("#searchInput");
const searchButtonElement = document.querySelector("#searchButton");

/** NOTE: 必要なHTML要素を取得してからコメントアウトを解除してください */
function updateResultCount(count) {
  resultCountElement.textContent = `${count}件表示`;
}

/** NOTE: 必要なHTML要素を取得してからコメントアウトを解除してください */
// 検索結果が0件のときのメッセージ表示/非表示を切り替えます。
function toggleEmptyMessage(shouldShow) {
  emptyMessageElement.classList.toggle("is-hidden", !shouldShow);
}

/** NOTE: 必要なHTML要素を取得してからコメントアウトを解除してください */
// ユーザーデータ1件分のカード要素をテンプレートから生成します。
function createCard(user) {
  // template要素を複製して、カードの土台を作成します。
  const cardFragment = profileCardTemplate.content.cloneNode(true);
  const imageElement = cardFragment.querySelector(".profile-image");
  const roleElement = cardFragment.querySelector(".profile-role");
  const nameElement = cardFragment.querySelector(".profile-name");
  const descriptionElement = cardFragment.querySelector(".profile-description");

  // 渡されたユーザー情報でカード内容を埋めます。
  imageElement.src = user.imageUrl;
  imageElement.alt = `${user.name}のプロフィール画像`;
  roleElement.textContent = user.role;
  nameElement.textContent = user.name;
  descriptionElement.textContent = user.description;

  return cardFragment;
}

// TODO: 一覧表示を行う関数を作成してください
// 要件:
// - 引数で受け取ったデータ配列をもとにカードを表示する
// - cardListの中身を更新する
// - resultCountに表示件数を反映する
// - データが0件なら emptyMessage を表示する
function renderCards(userList) {
  // 再描画前に既存のカードをクリアします。
  cardListElement.innerHTML = "";
  /**
   * TODO: ユーザーごとにカードを作成してDOMに追加します。
   * DOMへの追加メソッドはappendChildメソッドを使用します。
   */
  userList.forEach((user) => {
    const cardElement = createCard(user);
    cardListElement.appendChild(cardElement);
  });

  // TODO: 件数表示と空状態メッセージを最新状態に同期します。
  updateResultCount(userList.length);
  toggleEmptyMessage(userList.length === 0);
}

// TODO: 検索・絞り込みを行う関数を作成してください
// 要件:
// - 空文字の場合は全件表示
// - 名前または役職にキーワードを含むユーザーのみを返します。
function filterUsers(keyword) {
  // 前後空白を除去し、大文字小文字を区別しない比較用に正規化します。
  const normalizedKeyword = keyword.trim().toLocaleLowerCase();

  // TODO: 空文字の場合は全件表示します。
  if (normalizedKeyword === "") {
    return users;
  }

  // TODO: 名前または役職にキーワードを含むユーザーのみを返します。
  return users.filter((user) => {
    const normalizedName = user.name.toLocaleLowerCase();
    const normalizedRole = user.role.toLocaleLowerCase();

    return (
      normalizedName.includes(normalizedKeyword) ||
      normalizedRole.includes(normalizedKeyword)
    );
  });
}

// TODO: 検索入力の現在値を使って一覧を再描画してください
// 要件:
// - 入力値の取得
// - filterUsers を呼び出して一覧を再描画します。
function handleSearch() {
  // TODO: 入力値の取得
  const keyword = searchInputElement.value;
  // TODO: filterUsers を呼び出して一覧を再描画します。
  const filteredUsers = filterUsers(keyword);
  renderCards(filteredUsers);
}

searchInputElement.addEventListener("input", () => {
  if (searchInputElement.value.trim() === "") {
    handleSearch();
  }
});

searchButtonElement.addEventListener("click", handleSearch);

// TODO: 初回表示処理を実装してください
// 画面を開いたときに users が一覧表示されるようにする
renderCards(users);
