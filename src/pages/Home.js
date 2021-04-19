import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, GridColumn } from "semantic-ui-react";
import "./../App.css";
import { AuthContext } from "../context/auth";
import PostCard from "./../components/PostCard";
import Video from "./../animations/Video.mp4";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "./../util/graphql";
import LottieAnimation from "./../util/lottie";
import music from "./../animations/music.json";
function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <section>
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "300px",
            marginLeft: "0px",
            marginRight: "0px",

            // bottom: "10%",
            // height: "100%",
            objectFit: "cover",
            // transform: "translate(-50%,-50%)",
            // zIndex: "10",
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
      </section>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <GridColumn className="single">
              <PostForm />
            </GridColumn>
          )}
          {loading ? (
            <LottieAnimation lotti={music} height={300} width={300} />
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <GridColumn
                className="single"
                key={post.id}
                style={{ marginBottom: 20 }}
              >
                <PostCard post={post} />
              </GridColumn>
            ))
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Home;
