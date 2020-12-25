import "./App.css";
import ImageGrid from "./components/ImageGrid";
import ImageUpload from "./components/ImageUpload";
import useFetchImageUrl from "./hooks/useFetchImageUrl";

function App() {
  const [imageUrl] = useFetchImageUrl();

  return (
    <div>
      <ImageUpload />
      <ImageGrid imageUrl={imageUrl} />
    </div>
  );
}

export default App;
