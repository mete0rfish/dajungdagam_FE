import React, { useState } from 'react';
import styles from './FilterBar1.module.css';

const NavigationBar = () => {
  const allGus = [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
    "노원구", "동대문구", "도봉구", "동작구", "마포구", "서대문구", "성동구", "성북구",
    "서초구", "송파구", "영등포구", "용산구", "양천구", "은평구", "종로구", "중구", "중랑구", 
  ];

  const allMojib = [
    "모집예정", "모집중", "모집완료"
  ];

  const allCategories = [
    "미개봉 가공음식", "가전용품", "도서", "생필품", "옷", "기타",
  ];

  const [selectedGu, setSelectedGu] = useState(allGus[0]);
  const [selectedMojib, setSelectedMojib] = useState(allMojib[0]);
  const [selectedCategories, setSelectedCategories] = useState(allCategories[0]);

  const handleGuChange = (e) => {
    const selectedGuValue = e.target.value;
    setSelectedGu(selectedGuValue);
  };

  const handleMojibChange = (e) => {
    const selectedMojibValue = e.target.value;
    setSelectedMojib(selectedMojibValue);
  };

  const handleCategoriesChange = (e) => {
    const selectedCategoriesValue = e.target.value;
    setSelectedCategories(selectedCategoriesValue);
  };

  return (
    <div className={styles.header}>
      <ul className={styles.nav}>
        <li>
          <div className={styles.selectWrapper}>
            <select
              id="guSelect"
              value={selectedGu}
              onChange={handleGuChange}
              className={styles.select}
            >
              {allGus.map((gu) => (
                <option key={gu} value={gu}>
                  {gu}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li>
          <div className={styles.selectWrapper}>
            <select
              id="MojibSelect"
              value={selectedMojib}
              onChange={handleMojibChange}
              className={styles.select}
            >
              {allMojib.map((Mojib) => (
                <option key={Mojib} value={Mojib}>
                  {Mojib}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li>
          <div className={styles.selectWrapper}>
            <select
              id="CategoriesSelect"
              value={selectedCategories}
              onChange={handleCategoriesChange}
              className={styles.select}
            >
              {allCategories.map((categories) => (
                <option key={categories} value={categories}>
                  {categories}
                </option>
              ))}
            </select>
          </div>
        </li>
      </ul>

      <div className={styles.searchArea}>
        <form>
          <input type="search" placeholder="제목, 글 내용을 검색해보세요." />
          <span>검색</span>
        </form>
      </div>
    </div>
  );
};

export default NavigationBar;
