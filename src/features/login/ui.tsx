interface IProps {
	registration: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Login: React.FC<IProps> = ({ registration }) => {
	return (
		<>
			<h3>LoginFeatures</h3>
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
