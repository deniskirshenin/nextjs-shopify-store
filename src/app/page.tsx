import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import CollectionGrid from "@/components/CollectionGrid";
import Featured from "@/components/Featured";
import NewArrivals from "@/components/NewArrivals";
import ProductGrid from "@/components/ProductGrid";
import NewCollection from "@/components/NewCollection";
import CapsuleCollection from "@/components/CapsuleCollection";
import AllCollections from "@/components/AllCollections";

const Home = async () => {

  return (
    <main className="mx-auto">
      <Hero/>
      <CollectionGrid />
      {/* <NewArrivals /> */}
      <Featured />
      <NewCollection />
      <CapsuleCollection />
      {/* <ProductGrid /> */}
      {/* <AllCollections /> */}
      <Blog />
    </main>
  );
};

export default Home;