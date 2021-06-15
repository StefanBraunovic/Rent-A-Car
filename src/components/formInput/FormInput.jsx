import {Controller} from "react-hook-form";
import {Form, Input, InputNumber, Select, Tooltip,DatePicker} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import React from "react";


const FormInput = ({data:{name,type,
    label,required,icon,tooltip,defaultValue,
    input_params, options},errors,control}) => {

    return <Form.Item
        validateStatus={errors && errors[name] ? 'error' : ''}
        help={errors[name]?.message}
        label={label}
        htmlFor={name}
        required={required}
    >
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                switch(type){
                    case'text':
                        return <Input
                            {...field}
                            prefix={icon?icon:''}
                            {...input_params}
                            id={name}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                    case 'number':
                        return <InputNumber
                            {...field}
                            prefix={icon?icon:''}
                            {...input_params}
                            defaultValue={defaultValue}
                            id={name}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                    case 'select':
                       return <Select
                            {...field}
                            defaultValue={defaultValue}
                            {...input_params}
                            id={name}
                        >
                            {options.map((option,index) => {
                                return  <Select.Option key={index} value={option.value}>{option.label}</Select.Option>
                            })}

                        </Select>
                    case 'textarea':
                       return <Input.TextArea
                            {...field}
                            id={name}
                            {...input_params}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                    case 'date':
                        return <DatePicker
                            {...field}
                            id={name}
                            {...input_params}
                        />
                    case 'password':
                        return <Input.Password
                            {...field}
                            prefix={icon?icon:''}
                            {...input_params}
                            id={name}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                        default:
                            return <></>
            }

            }}
        />
    </Form.Item>
}

export default FormInput;