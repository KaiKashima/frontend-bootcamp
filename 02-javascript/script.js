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

const cardListElement = document.querySelector("#cardList");
const resultCountElement = document.querySelector("#resultCount");
const emptyMessageElement = document.querySelector("#emptyMessage");
const profileCardTemplate = document.querySelector("#profileCardTemplate");
const searchInputElement = document.querySelector("#searchInput");
const searchButtonElement = document.querySelector("#searchButton");

function updateResultCount(count) {
  resultCountElement.textContent = `${count}件表示`;
}

function toggleEmptyMessage(shouldShow) {
  emptyMessageElement.classList.toggle("is-hidden", !shouldShow);
}

function createCard(user) {
  const cardFragment = profileCardTemplate.content.cloneNode(true);
  const imageElement = cardFragment.querySelector(".profile-image");
  const roleElement = cardFragment.querySelector(".profile-role");
  const nameElement = cardFragment.querySelector(".profile-name");
  const descriptionElement = cardFragment.querySelector(".profile-description");

  imageElement.src = user.imageUrl;
  imageElement.alt = `${user.name}のプロフィール画像`;
  roleElement.textContent = user.role;
  nameElement.textContent = user.name;
  descriptionElement.textContent = user.description;

  return cardFragment;
}

function renderCards(userList) {
  cardListElement.innerHTML = "";

  userList.forEach((user) => {
    const cardElement = createCard(user);
    cardListElement.appendChild(cardElement);
  });

  updateResultCount(userList.length);
  toggleEmptyMessage(userList.length === 0);
}

function filterUsers(keyword) {

  const normalizedKeyword = keyword.trim().toLocaleLowerCase();

  if (normalizedKeyword === "") {
    return users;
  }
  return users.filter((user) => {
    const normalizedName = user.name.toLocaleLowerCase();
    const normalizedRole = user.role.toLocaleLowerCase();

    return (
      normalizedName.includes(normalizedKeyword) ||
      normalizedRole.includes(normalizedKeyword)
    );
  });
}

function handleSearch() {
  const keyword = searchInputElement.value;
  const filteredUsers = filterUsers(keyword);
  renderCards(filteredUsers);
}

searchInputElement.addEventListener("input", () => {
  if (searchInputElement.value.trim() === "") {
    handleSearch();
  }
});

searchButtonElement.addEventListener("click", handleSearch);

renderCards(users);
