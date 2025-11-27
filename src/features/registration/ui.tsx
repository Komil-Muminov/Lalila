interface IProps {
	login: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Registration: React.FC<IProps> = ({ login }) => {
	return (
		<>
			<h3>RegistrationFeatures</h3>
			<button
				onClick={() => {
					console.log(`Login`);
					login(true);
				}}
			>
				Есть аккаунт?
			</button>
		</>
	);
};
