import { useContext, useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { signIn } from '~/api/Auth'
import { RESULT_CODES } from '~/constants/resultCode.constant.ts'
import { useNavigate } from 'react-router-dom';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { NotificationContext } from '~/contexts/NotificationContext';

export function SignIn() {

    const navigate = useNavigate();
    const signInAuth = useSignIn();
    const notification = useContext(NotificationContext)

    useEffect(() => {
        notification('info', 'hieuld')
    }, [])


    const [message, setMessage] = useState('')
    const onFinish = (values) => {
        var data = {
            username: values.username,
            password: values.password
        }

        signIn(data).then((response) => {
            var result = response.data
            if (result.code !== RESULT_CODES.SUCCESS) {
                setMessage(result.message)
                return;
            }

            signInAuth({
                auth: {
                    token: result.value.accessToken,
                    type: 'Bearer'
                },
                //refresh: result.value.refreshToken,
                userState: {
                    userId: result.value.userId
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
                    {message === '' ? <></> : <i style={{ color: 'red' }}>{message}</i>}
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}