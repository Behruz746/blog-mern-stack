import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const pispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const { posts, tags } = useSelector((state) => state.posts);
  // isLoad post
  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    pispatch(fetchPosts());
    pispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, idx) => {
            if (isPostsLoading) {
              return <Post key={idx} isLoading={true} />;
            }

            return (
              <Post
                id={post?._id} // Unique id for each post
                title={post?.title}
                imageUrl={post?.imageUrl}
                user={{
                  avatarUrl: post?.user?.avatarUrl,
                  fullName: post?.user?.fullName,
                }}
                createdAt={post?.createdAt}
                viewsCount={post?.viewsCount}
                commentsCount={3} // This should be dynamic if possible
                tags={post?.tags}
                isEditable={data?._id === post?.user?._id}
                key={post?._id || idx} // Better to use unique id if available
              />
            );
          })}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={tags.status === "loading" ? true : false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
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
          />
        </Grid>
      </Grid>
    </>
  );
};
