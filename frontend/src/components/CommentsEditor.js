import React, { useState, useEffect, Component } from 'react'


// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import draftjs from 'draftjs-to-html'



import { Editor, Toolbar } from '@wangeditor/editor-for-react'

// const path = require('path')

export default function CommentsEditor(props) {
    console.log(props)
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('<p></p>') // 编辑器内容
    // console.log(props.content)
    // 模拟 ajax 请求，异步设置 html
    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {}
    }
    toolbarConfig.excludeKeys = [
        'headerSelect',
        'italic',
        'group-more-style' // 排除菜单组，写菜单组 key 的值即可

    ]
    editorConfig.MENU_CONF['uploadImage'] = {
        server: 'http://localhost:3000/', // 上传图片地址

        timeout: 5 * 1000, // 5s

        fieldName: 'custom-fileName',
        meta: { token: 'xxx', a: 100 },
        metaWithUrl: true, // 参数拼接到 url 上
        headers: { Accept: 'text/x-json' },

        maxFileSize: 10 * 1024 * 1024, // 10M

        base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

        onBeforeUpload(files) {
            console.log('onBeforeUpload', files)

            return files // 返回哪些文件可以上传
            // return false 会阻止上传
        },
        onProgress(progress) {
            console.log('onProgress', progress)
        },
        onSuccess(file, res) {
            console.log('onSuccess', file, res)
        },
        onFailed(file, res) {
            alert(res.message)
            console.log('onFailed', file, res)
        },
        onError(file, err, res) {
            alert(err.message)
            console.error('onError', file, err, res)
        },
    }


    // editorConfig.onBlur = (editor) => {
    //     // editor blur
    //     setHtml(editor.getHtml())
    //     console.log(editor.getHtml())
    // }
    // 及时销毁 editor ，重要！

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    useEffect(() => {
        // console.log(props.isBlur)
        if (props.isBlur) {
            props.getContent(html)
        }
        return () => {
            props.setIsBlur(false)
            // console.log(props.isBlur)
        };
    }, [props.isBlur])
    const handleChange = (editor) => {
        setHtml(editor.getHtml())
    }
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 1000 }} >
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => {
                        // console.log(editor)
                        return handleChange(editor)
                    }}
                    mode="default"
                    style={{ height: '200px', overflow: 'hidden' }}
                />
            </div>
        </>
    )
}