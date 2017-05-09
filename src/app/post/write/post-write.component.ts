import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {PostService} from "../post.service";
import {Post} from "../../model/post";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-write.component.html',
    styleUrls: ['./post-write.component.css']
})
export class PostWriteComponent implements OnInit, AfterViewInit {

    @ViewChild('simplemde') textarea: ElementRef;

    private markdownEditor: any; // md 编辑器

    private post = new Post(); // 文章

    text = '![](http://localhost:4200/src/assets/aaa.jpg) \n\n # Logstash pipeline 配置概要\n\n[TOC]\n\n## 常用参数\n\n- **-e** 立即执行配置\n\n    ```\n    logstash -e \'input { stdint{} } output { stdout {codec=>rubydebug} }\'\n    ```\n\n- **-f** 指定配置文件\n    \n    ```\n    logstash -f xxx.logstash.conf\n    ```\n    \n- **-t** 测试配置语法并退出\n    \n    ```\n    logstash -f test2.logstash.conf -t\n    ```\n    \n- **-l** logstash 默认将日志输出到标准错误，生产环境可指定日志输出位置\n    \n    ```\n    logstash -l /var/logs/logstash.log\n    ```\n    \n- **-w** 过滤器线程数量\n    \n    ```\n    logstash -w 5\n    ```\n\n- **-r** 更改配置文件后自动重启\n    \n    ```\n    logstash -f xxx.logstash.conf -r\n    ```\n    \n## DSL\n\nlogstash 设计了一套自己的 DSL 语法，包括以下部分\n\n###区段\n\n一个标准配置有三个区段，其中 **stdin, mutate, stdout** 都是标准插件，想要自定义一个插件可以参考这篇文章 [Logstash 集成 aliyun/oss 插件]()\n\n```\ninput{\n    stdin{}\n}\n\nfilter{\n    mutate{}\n}\n\noutput{\n    sdtout{}\n}\n```\n\n###支持的数据类型\n\n- array\n- boolean\n- bytes\n- Codec\n- hash\n- number\n- password\n- path\n- string\n\n###引用字段\n\n[filed] 即引用了一个字段，如果是顶级字段可以省略 [] 即 filed，如果是嵌套字段需要这样写[outer_filed][inner_filed]\n\n像下面的数据结构引用 **ip** 字段: `[ip] 或 ip` ，引用 **os** 字段: `[ua][os]`\n\n```\n{\n  "agent": "Mozilla/5.0 (compatible; MSIE 9.0)",\n  "ip": "192.168.24.44",\n  "request": "/index.html"\n  "response": {\n    "status": 200,\n    "bytes": 52353\n  },\n  "ua": {\n    "os": "Windows 7"\n  }\n}\n```\n\n### 环境变量引用\n\n如下，引用环境变量 `${TCP_PORT}` , 可以添加默认值 `${TCP_PORT:3100}`\n\n```\ninput {\n    tcp {\n        port => "${TCP_PORT:3100}"\n    }\n}\n```\n\n### sprintf 格式\n\n引用的字段可以应用于 **sprintf** 格式，如下 `%{}` 包装字段引用\n\n```\nfilter{\n\tmutate {\n\t\tadd_tag => "new tag %{[field]}"\n\t}\n}\t\noutput {\n  file {\n    path => "/var/log/%{type}.%{+yyyy.MM.dd.HH}"\n  }\n}\n```\n\n### 条件判断\n\n使用条件判断可以控制在区段内处理特定的事件，条件判断语法如下：\n\n```\nif EXPRESSION {\n  ...\n} else if EXPRESSION {\n  ...\n} else {\n  ...\n}\n```\n\n常见操作有\n\n- **==, !=, <, >, <=, >=** 等于操作\n- **=~, !~**  正则匹配\n- **in, not in** 包含\n- **and, or, nand, xor** 与或非\n- **!** 取反\n\n举个例子\n\n```\n# 在过滤器中，action 字段为 login 时，删除 secret\nfilter {\n    if [action] == "login" {\n        mutate { remove => "secret" }\n    }\n}\noutput {\n    # 发送消息到 pagerduty\n    if [loglevel] == "ERROR" and [deployment] == "production" {\n        pagerduty {\n        }\n    }\n}\n```\n\n*注意: 字段引用、sprintf 格式、条件判断只能用于 filter 和 output，不能用于input*\n\n### @metadata\n\n最常见的用法是在 filter 中指定 **@metadata**，控制输出逻辑，**@metadata** 作为元数据并不会随数据一并输出，可视为临时变量\n\n```\ninput { stdin { } }\n\nfilter {\n    mutate { add_field => { "show" => "This data will be in the output" } }\n    mutate { add_field => { "[@metadata][output]" => "stdout" } }\n    mutate { add_field => { "[@metadata][output]" => "file" } }\n}\n\noutput {\n    if [@metadata][output] == "stdout" {\n        stdout { codec => rubydebug }\n    } else if [@metadata][output] == "file" {\n        file {}\n    }\n}\n```\n\n若想输出 **@metadata** 字段，需要设置 `metadata => true`\n\n```\nstdout { codec => rubydebug { metadata => true } }\n```\n\n\n\n\n\n\n\n';

    constructor(private postService: PostService) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        // 初始化 markdown 编辑器
        this.markdownEditor = new SimpleMDE({
            element: this.textarea.nativeElement,
            // showIcons: ["code", "table"]
        });

        // 编辑器监听
        this.markdownEditor.codemirror.on('change', () => {
            this.post.content = this.markdownEditor.value();
        });

        // 初始化时间选择器
        flatpickr(".flatpickr", {enableTime: true});
    }

    onPublishClick() {
        // let post = {
        //     value: this.markdownEditor.value()
        // };
        // this.postService.createPost(post).subscribe(result => {
        //     // console.log('AAA', result);
        // });
        console.log('ABC', this.post)
    }

}
