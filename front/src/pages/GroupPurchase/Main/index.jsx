// 공동구매() Main 페이지
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../../components/Nav';
import Nav2 from '../../../components/Nav2'; 
import Footer from '../../../components/Footer';
import classes from './Main.module.css';
import rabbit3Image from "../../../assets/rabbit3.png";
import PostList2 from '../../../components/PostList2';
import PostList4 from '../../../components/PostList4';
import FilterBar1 from '../../../components/FilterBar1';
import { getCookie, removeCookie } from '../../../cookie/cookieConfig'; 

// MainPage 컴포넌트 정의
const MainPage = () => {
  const isLoggedIn = getCookie("userId") !== undefined
  const [popularPosts, setPopularPosts] = useState([]);
  const [groupBuyingPosts, setGroupBuyingPosts] = useState([]);

// 로그아웃 처리
  const handleLogout = () => {
    removeCookie("userId");
  };

  //뭔지 모름 수정
  const [likeCountArray, setLikeCountArray] = useState([]); 
  const [viewCountArray, setViewCountArray] = useState([]); 
  const [postDataArray, setPostDataArray] = useState([]);   
  
//group-buying-like-posts API 호출
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await fetch('https://tave-dgdg.run.goorm.io/group-buying/like-posts');
        const data = await response.json();
        const top3PopularPosts = data.slice(0, 1).flat();
        setPopularPosts(top3PopularPosts);

      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    };

    //group-buying API 호출
    const fetchGroupBuyingPosts = async () => {
      try {
        const response = await fetch('https://tave-dgdg.run.goorm.io/group-buying');
        const data = await response.json();
        const updatedLikeCounts = data.map(post => post.wishlistCount);
        const updatedViewCounts = data.map(post => post.viewCount);
  
        setLikeCountArray(updatedLikeCounts);
        setViewCountArray(updatedViewCounts);
        setPostDataArray(data);

        setGroupBuyingPosts(data);

      } catch (error) {
        console.error('게시물을 불러오는 중 에러 발생:', error);
      }
    };

    // 각각의 API 호출
    fetchPopularPosts();
    fetchGroupBuyingPosts();
  }, []);

  return (
    <div>
       {/* 헤더이미지 */}
      {isLoggedIn ? <Nav onLogout={handleLogout} /> : <Nav2 />}
      <div className={classes.main2Bg}>
        <div className={classes.mainText1}>
          <p className={classes.surHeading}>공동구매</p>
          <div className={classes.mainHeading}>이웃만 아는<br />공동구매 이야기</div>
          <p className={classes.subHeading}>우리동네만의 다양한 공동구매를<br />
            공감과 댓글로 나누어요.</p>
        </div>
        <div className={classes.rabbit2}>
          <Link to="/groupmain"><img src={rabbit3Image} alt="귀여운 토끼" /></Link>
        </div>
      </div>

      {/* "인기글" 추가 */}
      <div className={classes.popularPostsHeading}>
        <h2>인기글</h2>
      </div>
      
      <PostList2 posts={popularPosts} />

      {/* "게시물" 추가 */}
      <div className={classes.popularPostsHeading}>
        <h2>게시물</h2>
      </div>

      {/* "필터바" 추가 */}
      <FilterBar1 />

       
      {/* "postlist4로 게시물" 추가 */}

      <PostList4 posts={groupBuyingPosts} />
    
       {/* "Footer" 추가 */}
      <Footer />
    </div>
  );
};

function GroupMain() {
  return ( <MainPage />
  );
}

export default GroupMain;
