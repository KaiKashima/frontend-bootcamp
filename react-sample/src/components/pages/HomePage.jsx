import { useMemo, useState } from 'react';
import profiles from '../../data/profiles';
import SearchForm from '../molecules/SearchForm';
import ProfileList from '../organisms/ProfileList';
import ProfileDirectoryTemplate from '../templates/ProfileDirectoryTemplate';

function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const filteredProfiles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    // TODO:
    // 1. keyword が空なら全件表示する
    if(!normalizedKeyword){
      return profiles;
    }
    // 2. 名前または役職に keyword が含まれていたら表示する(チェック用のテキストは以下のように整形してください: `${name} ${role}`.toLowerCase()。変数名はサンプルです)
    return profiles.filter((profile) => {
      const targetText = `${profile.name} ${profile.role}`.toLowerCase();
      return targetText.includes(normalizedKeyword);
    });
  }, [keyword]);

  const handleKeywordChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // TODO:
    // 必要なら検索ボタン押下時の処理を追加してください。
    // 例: ログ出力 / バリデーション / 検索タイミングの制御
    setKeyword(inputValue);
  };

  /**
   * TODO:
   * 1. SearchFormコンポーネントを呼び出してください
   * <SearchForm
   *   keyword={inputValue}
   *   onKeywordChange={handleKeywordChange}
   *   onSearch={handleSearch}
   * />
   * 2. プロフィールデータをProfileListコンポーネントに渡してください 
   * <ProfileList profiles={プロフィールデータ} />
   */
  return (
    <ProfileDirectoryTemplate
      searchArea={
      <SearchForm
      keyword={inputValue}
      onKeywordChange={handleKeywordChange}
      onSearch={handleSearch}
      />
    }
      contentArea={<ProfileList profiles={filteredProfiles} />}
    />
  );
}

export default HomePage;
