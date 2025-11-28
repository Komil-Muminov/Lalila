import { Button, Form } from "antd";
import { RenderFields } from "./ui/RenderFields";
import { useMutationQuery } from "@/shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface IProps {
	registration: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<IProps> = ({ registration }) => {
	const {
		mutate: loginMutate,
		isSuccess: isLoginIsSuccess,
		isPending: isLoginIsPending,
	} = useMutationQuery({
		url: "http://localhost:5000/auth/login",
		method: "POST",
		messages: {
			success: "Вы успешно вошли",
		},
	});
	const navigate = useNavigate();
	useEffect(() => {
		if (isLoginIsSuccess) {
			navigate("/admin");
		} else {
			console.log(`kms login error`);
		}
	}, [isLoginIsSuccess]);
	const handleLoginSubmit = (values: any) => {
		loginMutate(values);
	};
	return (
		<>
			<h3>LoginFeatures</h3>
			<Form onFinish={handleLoginSubmit}>
				<RenderFields />
				<Button htmlType="submit" loading={isLoginIsPending}>
					Войти
				</Button>
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
