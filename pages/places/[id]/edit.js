import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "@/components/Form.js";
import { StyledLink } from "@/components/StyledLink";

//import Form from "../../../components/Form.js";
//import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: place,
    isLoading,
    error,
  } = useSWR(id ? `/api/places/${id}` : null);

  if (!router.isReady || isLoading || error) return <h2>Loading...</h2>;

  async function editPlace(updatedPlace) {
    const response = await fetch(`/api/places/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlace),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Failed to edit place");
    }
  }

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink $justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
