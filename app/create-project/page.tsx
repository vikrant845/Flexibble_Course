import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateProject = async () => {
    const session = await getCurrentUser();
    
    // If session is not present i.e use has not logged in we redirect to home
    if (!session?.user) redirect('/');
    
    return (
        <Modal>
            <h3 className='modal-head-text'>Create A New Project</h3>
            <ProjectForm type='create' session={session} />
        </Modal>
    );
}

export default CreateProject;