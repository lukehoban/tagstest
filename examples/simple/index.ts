import * as tagstest from "@pulumi/tagstest";
import * as random from "@pulumi/random";
import * as pulumi from "@pulumi/pulumi";

const str = new random.RandomString("s", {
    number: false,
    special: false,
    length: 5,
});


const page = new tagstest.StaticPage("page", {
    indexContent: "<html><body><p>Hello world!</p></body></html>",
}, {
    transformations: [({ props, opts, type }) => {
        return {
            props: {
                ...props,
                tags: {
                    "foo": "bar",
                    "other": str.result,
                },
            },
            opts: opts,
        }
    }],
});

export const bucket = page.bucket;
