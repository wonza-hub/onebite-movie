import MovieDetailPage from "@/app/movie/[id]/page";
import Modal from "@/components/modal/modal";

export default function Page(props: any) {
  return (
    <Modal>
      <MovieDetailPage {...props} />
    </Modal>
  );
}
