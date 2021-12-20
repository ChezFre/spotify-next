import Layout from "../components/Layout";

function Home() {
  return <h1>Index</h1>;
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
