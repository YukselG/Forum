export interface Comment {
	id: number;
	content: string;
	userId: string;
	username: string;
	dateOfCreation: Date;
	postId: number;
}

export type CreateCommentData = {
	content: string;
	//userId: string;
	postId: Number;
	//dateOfCreation: Date
};

export type UpdateCommentData = {
	id: number;
	content: string;
};
