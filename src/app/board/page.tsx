"use client";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState, useEffect, useRef } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;
//
//

export default function GraphQlMutationPage() {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [createProduct] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    try {
      const result = await createProduct({
        variables: {
          writer,
          title,
          contents,
        },
      });
      alert("게시글 등록이 완료되었습니다");
      router.push(`/board/${result.data.createBoard.number}`);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  return (
    <div>
      작성s자: <input type='text' onChange={onChangeWriter} />
      제목: <input type='text' onChange={onChangeTitle} />
      내용: <input type='text' onChange={onChangeContents} />
      <button onClick={onClickSubmit}>GRAPHQL 요청</button>
    </div>
  );
}
