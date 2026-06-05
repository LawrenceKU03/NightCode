import { useParams } from "react-router";
import SessionShell from "../components/SessionShell";

const index = () => {
	const { id } = useParams();

	return <SessionShell onSubmit={() => {}} inputDisabled loading />;
};

export default index;
