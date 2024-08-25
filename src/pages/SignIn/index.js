import { useContext, useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { signIn } from '~/api/Auth'
import { RESULT_CODES } from '~/constants/ResultCode.constant.ts'
import { useNavigate } from 'react-router-dom';

import { useSignIn } from 'react-auth-kit';
import { NotificationContext } from '~/contexts/NotificationContext';

export function SignIn() {

    const navigate = useNavigate();
    const signInAuth = useSignIn();
    const notification = useContext(NotificationContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        notification('info', 'hieuld')
    }, [])


    const [message, setMessage] = useState('')
    const onFinish = (values) => {
        var data = {
            username: values.username,
            password: values.password
        }

        setLoading(true)

        signIn(data).then((response) => {

            console.log(response)

            setTimeout(() => {
                setLoading(false)
            }, 500)

            if (response.code !== RESULT_CODES.SUCCESS) {
                setMessage(response.message)
                return;
            }

            signInAuth({
                token: '',
                expiresIn: 10000,
                //refresh: result.value.refreshToken,
                authState: {
                    userId: response.value.userId,
                    roleId: response.value.roleId
                }
            })
            navigate('/home')
        })
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {message === '' ?
                        <></>
                        :
                        <>
                            <i style={{ color: 'red' }}>{message}</i>
                            <br />
                        </>
                    }
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}