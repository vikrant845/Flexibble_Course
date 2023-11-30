import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as { project?: ProjectInterface };
    
    if (!result?.project) return ( <p>Failed to fetch project details</p> )
    
    return (
        <Modal>
            <div className="w-full flex flex-row items-center">
                <Image
                    src={result.project.createdBy.avatarUrl}
                    width={48}
                    height={48}
                    alt="Project Image"
                    className='rounded-full me-5'
                />
                <div className="flex flex-col justify-between">
                    <p className="font-bold">{result.project.title}</p>
                    <div className="flex flex-row text-sm">
                        <p className="me-2">{result.project.createdBy.name}</p>
                        <p>{result.project.category}</p>
                    </div>
                </div>
            </div>
            <Image
                src={result.project.image}
                width={1400}
                height={100}
                className="rounded-3xl mt-20"
                alt="Project Image"
            />
        </Modal>
    );
}

export default Project;