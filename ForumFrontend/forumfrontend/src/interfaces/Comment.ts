export interface Comment {
	id: number;
	content: string;
	author: string;
	dateOfCreation: Date;
	postId: number;
}

export type CreateCommentData = {
	content: string;
	//userId: string;
	postId: Number;
	//dateOfCreation: Date
};
