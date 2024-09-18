import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`posts/${id}`);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Post
        id={post?._id}
        title={post?.title}
        imageUrl={post?.imageUrl}
        user={{
          avatarUrl: post?.user?.avatarUrl,
          fullName: post?.user?.fullName,
        }}
        createdAt={post?.createdAt}
        viewsCount={post?.viewsCount}
        commentsCount={3}
        tags={post?.tags}
        isFullPost
        isLoading={isLoading}
      >
        <p>{post?.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
