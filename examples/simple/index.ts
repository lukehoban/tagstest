import * as tagstest from "@pulumi/tagstest";
import * as random from "@pulumi/random";
import * as pulumi from "@pulumi/pulumi";

const str = new random.RandomString("s", {
    number: false,
    special: false,
    length: 10,
});

pulumi.runtime.registerStackTransformation(({props, opts, type}) => {
    if (type == "tagstest:index:StaticPage") {
        return { 
            props: {
                ...props,
                tags: {
                    "foo": "bar2",
                    "other": str.result,
                },
            },
            opts: opts,
        }
    }
    return;
});

const page = new tagstest.StaticPage("page", {
    indexContent: "<html><body><p>Hello world!</p></body></html>",
    tags: {
        "foo": "bar",
        "other": str.result,
    },
});

export const bucket = page.bucket;
export const url = page.websiteUrl;
