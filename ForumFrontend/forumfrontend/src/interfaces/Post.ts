export interface Post {
	id: number;
	title: string;
	description: string;
	author: string;
	dateOfCreation: Date;
	numberOfComments: number;
	categoryId: number;
}

export type CreatePostData = {
	title: string;
	description: string;
	author: "Hans";
	categoryId: number;
	//dateOfCreation: Date;
};
