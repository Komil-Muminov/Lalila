import { Form } from "antd";
import { RenderFields } from "./ui/RenderFields";
interface IProps {
	registration: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<IProps> = ({ registration }) => {
	return (
		<>
			<h3>LoginFeatures</h3>
			<Form>
				<RenderFields />
			</Form>
			<button
				onClick={() => {
					console.log(`km`);
					registration(false);
				}}
			>
				Хотите зарегистрироваться?{" "}
			</button>
		</>
	);
};
