const index = () => {
	return (
		<box alignItems="center" justifyContent="center">
			<box
				justifyContent="center"
				alignItems="flex-end"
				flexDirection="row"
				gap={0.5}
			>
				<ascii-font font="tiny" text="&#x3E;Night" color="gray" />
				<ascii-font font="tiny" text="Code" />
			</box>
		</box>
	);
};

export default index;
