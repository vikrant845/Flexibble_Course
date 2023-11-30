"use client"

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import Button from './Button';
import { categoryFilters } from "@/constants/constants";
import CustomMenu from "./CustomMenu";
import { createProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
    type: string,
    session: SessionInterface
}

const ProjectForm = ({ type, session }: Props) => {

    const router = useRouter();
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { token } = await fetchToken();

        try {
            if (type === 'create') {
                await createProject(form, session?.user?.id, token);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.currentTarget.files?.[0];
        if (!file) return;
        if (!file.type.includes('image')) {
            return alert('Please select an image file');
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        }
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => (
            { ...prevState, [fieldName]: value }
        ));
    }
    const [ form, setForm ] = useState({
        image: '',
        title: '',
        description: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: '',
    });
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    
    return (
        <form className='flexStart form' onSubmit={ handleFormSubmit }>
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    { !form.image && 'Please choose an image to upload'  }
                </label>
                <input type="file" id="image" accept="image/*" required={ type === 'create' } className="form_image-input" onChange={ handleChangeImage } />
                { form.image && <Image src={ form?.image } className='sm: p-10 object-contain z-20' alt="Project Poster" fill />  }
            </div>
            <FormField title='Title' state={ form?.title } placeholder='Flexibble' setState={ (value) => handleStateChange('title', value) } />
            <FormField title='Description' state={ form?.description } placeholder='Some description from some world' setState={ (value) => handleStateChange('description', value) } />
            <FormField type="url" title='Website url' state={ form?.liveSiteUrl } placeholder='Some url from some place' setState={ (value) => handleStateChange('liveSiteUrl', value) } />
            <FormField type="url" title='Github url' state={ form?.githubUrl } placeholder='Some url from some galaxy' setState={ (value) => handleStateChange('githubUrl', value) } />
            <CustomMenu
                title='Category'
                state={ form.category }
                filters={ categoryFilters }
                setState={ (value) => handleStateChange('category', value) }
            />
            <div className="flexStart w-full">
                <Button title={ `${ isSubmitting ? `${ type === 'create' ? 'Creating' : 'Editing' }` : `${ type === 'create' ? 'Create' : 'Edit' }` }` } type='submit' leftIcon={ isSubmitting ? '' : '/plus.svg' } isSubmitting={ isSubmitting } />
            </div>
        </form>
    );
}

export default ProjectForm;