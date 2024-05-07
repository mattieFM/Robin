import React from 'react';
import { useNavigate } from "react-router-dom";
import { paths } from '../../../config.mjs';
import axios from 'axios';
import { apiPaths } from '../../../api/apiConfig';
import { Form } from '../../Form/Form';
import { InstructionHeader } from '../../misc/instructionHeader';
import { FormField } from '../../Form/FormField/FormField';
import { jobSetupFormData } from '../../tempTypes/Types';


export const BasicJobInfoInputs = (props:{setData?:(any)=>void}) => {
    let navigate = useNavigate();

    return  (
    <>
    <InstructionHeader title='provide job information'/>
    <Form 
    setData={props.setData}
    fakeForm= {true}
    fields={[
            {
            title:'Job Title' ,
            name:'jobTitle',
            required:true,
            },

            {
            name:"description",
            title:'Description', 
            required:true
            },

            {
            name:'email',
            title:'Email',
            required:false,
            inputType:'email'
            }]}
            onSubmit={onSubmitJobInfo}
            />
    </>
    )

    /**
     * @description the handler for when the user submits the form
     * @param formData the form data they submitted
     */
    function onSubmitJobInfo(formEvent){
        formEvent.preventDefault();
        let data: jobSetupFormData = {
            email: formEvent.target.elements.email.value,
            description: formEvent.target.elements.description.value,
            title: formEvent.target.elements.jobTitle.value,
        }

        axios.post(apiPaths.jobInfo, data).then((res: any) =>{
            if(res.data.status === 200){
                console.log(data);
                navigate(paths.upload +"/" +res.data.id);
            } else {
                alert("An Unexpected error occurred.")
            }
        })
        
        return "test";
    }
}
    
