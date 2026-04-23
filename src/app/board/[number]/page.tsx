"use client";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      number
      writer
      title
      contents
      like
      createdAt
    }
  }
`;

const SkeletonUI = () => {
  const skeletonItemStyle: React.CSSProperties = {
    backgroundColor: '#e5e7eb',
    borderRadius: '8px',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div style={{ ...skeletonItemStyle, height: '32px' }}></div>
      <div style={{ ...skeletonItemStyle, height: '24px', width: '50%' }}></div>
      <div style={{ ...skeletonItemStyle, height: '24px', width: '66.67%' }}></div>
      <div style={{ ...skeletonItemStyle, height: '128px' }}></div>
    </div>
  );
};

const BoardDetailPage = () => {
  const params = useParams();
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { number: Number(params.number) },
  });

  if (loading) {
    return <SkeletonUI />;
  }

  if (!data?.fetchBoard) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div>{data.fetchBoard.number}번 게시글!</div>
      <div>작성자: {data.fetchBoard.writer}</div>
      <div>제목: {data.fetchBoard.title}</div>
      <div>내용: {data.fetchBoard.contents}</div>
    </div>
  );
};

export default BoardDetailPage;
