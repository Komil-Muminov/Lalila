import { Form, Input } from "antd";
import "../style.css";
export const RenderFields: React.FC = () => {
	return (
		<div className="login__fields-content ">
			<Form.Item name="login" className="max-w-[200px]">
				<Input allowClear placeholder="Введите логин" />
			</Form.Item>
			<Form.Item name="password" className="max-w-[200px]">
				<Input allowClear placeholder="Введите пароль" type="password" />
			</Form.Item>
		</div>
	);
};
