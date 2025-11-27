import React from "react";

type IProps = {
	is: boolean | undefined | any;
	children?: any;
	className?: string | undefined;
};

export const If: React.FC<IProps> = ({ is, children }) => {
	if (!is) return null;
	return typeof children === "function" ? children() : children;
};
