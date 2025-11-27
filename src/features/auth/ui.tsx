import { useState } from "react";
import { Login } from "../login";
import { Registration } from "../registration";
import { If } from "@/shared/ui/if";

export const Auth: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);
	return (
		<>
			<h3>AuthFeatures</h3>
			<div className="auth__content">
				<If is={isLogin}>
					<Login registration={setIsLogin} />
				</If>
				<If is={!isLogin}>
					<Registration login={setIsLogin} />
				</If>
			</div>
		</>
	);
};
