import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Section = styled.section`
  width: 100%;
  padding: 70px 0 80px;
  font-family: 'Montserrat Alternates', sans-serif;
`;

const Container = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #111;
  margin-bottom: 42px;
`;

const NewsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 270px);
  justify-content: center;
  gap: 20px;
  margin-bottom: 44px;

  transition: all 0.3s ease;
`;

const NewsCard = styled.a`
  display: block;
  text-decoration: none;
  color: #111;

  animation: newsAppear 0.35s ease forwards;

  transition:
    transform 0.25s ease,
    filter 0.25s ease;

  @keyframes newsAppear {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.97);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewsImage = styled.img`
  width: 270px;
  height: 208px;
  border-radius: 8px;
  object-fit: cover;
  display: block;
  margin-bottom: 20px;

  transition: box-shadow 0.25s ease;

  ${NewsCard}:hover & {
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.16);
  }
`;

const NewsTitle = styled.p`
  width: 270px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.25;
  margin: 0;
`;

const SeeMoreButton = styled.button`
  width: 138px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #ffb36c;

  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #111;

  cursor: pointer;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;

  &:hover {
    background: #ff9f45;
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(255, 179, 108, 0.4);
  }

  &:active {
    transform: scale(0.96);
  }
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #555;
`;

function ActualNews() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchNews(pageNumber) {
    try {
      const response = await fetch(
        `http://localhost:5000/actual-news?page=${pageNumber}&topic=weather`
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'News request failed');
        return;
      }

      const newsArray = Array.isArray(data) ? data : data.articles;

      if (!Array.isArray(newsArray)) {
        toast.error('News data is broken');
        return;
      }

      const limitedNews =
        pageNumber === 1 ? newsArray.slice(0, 4) : newsArray.slice(0, 8);

      setArticles(prevArticles => {
        const newArticles =
          pageNumber === 1 ? limitedNews : [...prevArticles, ...limitedNews];

        const uniqueArticles = newArticles.filter(
          (article, index, array) =>
            index === array.findIndex(item => item.url === article.url)
        );

        return uniqueArticles;
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleSeeMore() {
    const nextPage = page + 1;

    setPage(nextPage);
    fetchNews(nextPage);
  }

  function handleShowLess() {
    setArticles(prevArticles => prevArticles.slice(0, 4));
    setPage(1);
  }

  useEffect(() => {
    fetchNews(1);
  }, []);
  return (
    <Section>
      <Container>
        <Title>Actual News</Title>

        {articles.length > 0 ? (
          <NewsList>
            {articles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                href={article.url}
                target="_blank"
                rel="noreferrer"
              >
                <NewsImage src={article.image} alt={article.title} />

                <NewsTitle>{article.title}</NewsTitle>
              </NewsCard>
            ))}
          </NewsList>
        ) : (
          <EmptyText>No news found</EmptyText>
        )}

        <ButtonBox>
          <SeeMoreButton type="button" onClick={handleSeeMore}>
            See more
          </SeeMoreButton>

          {articles.length > 4 && (
            <SeeMoreButton type="button" onClick={handleShowLess}>
              Show less
            </SeeMoreButton>
          )}
        </ButtonBox>
      </Container>
    </Section>
  );
}

export default ActualNews;
