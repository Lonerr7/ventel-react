import {useGetDataQuery} from "@shared/api";

export default function App() {
  const {data, isLoading} = useGetDataQuery();

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      App mounted
    </div>
  );
}
