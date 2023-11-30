export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedInUrl
        }
    }
`;

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                avatarUrl
                description
                githubUrl
                linkedInUrl
                id
            }
        }
    }
`;

export const createProjectMutation = `
    mutation CreateProject($input: ProjectCreateInput!) {
        projectCreate(input: $input) {
            project {
                id,
                title,
                description,
                createdBy {
                    email,
                    name
                }
            }
        }
    }
`;

export const projectsQuery = `
    query getProjects($category: String, $endCursor: String) {
        projectSearch(first: 8, after: $endCursor, filter: { category: { eq: $category } }) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    title
                    githubUrl
                    description
                    liveSiteUrl
                    id
                    image
                    category
                }
            }
        }
    }
`;

export const getProjectByIdQuery = `
    query getProjectById($id: ID!) {
        project(by: {id: $id}) {
            id
            title
            description
            image
            liveSiteUrl
            githubUrl
            category
            createdBy {
                id
                name
                email
                avatarUrl
            }
        }
    }
`;