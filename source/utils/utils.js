export function waitForElement(selector) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element with selector "${selector}" not found within 2 seconds`));
        }, 2000);
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                clearTimeout(timeout);
                resolve(element);
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};

//courtesy of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
export function typeChecker(value) {
    if (value === null) {
      return "null";
    }
    const baseType = typeof value;
    // Primitive types
    if (!["object", "function"].includes(baseType)) {
      return baseType;
    }
    // Symbol.toStringTag often specifies the "display name" of the
    // object's class. It's used in Object.prototype.toString().
    const tag = value[Symbol.toStringTag];
    if (typeof tag === "string") {
      return tag.toLowerCase();
    }
  
    // If it's a function whose source code starts with the "class" keyword
    if (
      baseType === "function" &&
      Function.prototype.toString.call(value).startsWith("class")
    ) {
      return "class";
    }
  
    // The name of the constructor; for example `Array`, `GeneratorFunction`,
    // `Number`, `String`, `Boolean` or `MyCustomClass`
    const className = value.constructor.name;
    if (typeof className === "string" && className !== "") {
      return className.toLowerCase();
    }
  
    // At this point there's no robust way to get the type of value,
    // so we use the base implementation.
    return baseType;
  }


  export const validateModal = (object, schema) => {
    const errors = Object
        .keys(schema)
        .filter((key) => {
            if(schema[key].optional && object[key]) {
                return !schema[key].validator(object[key]);
            };
            return (!schema[key].optional && !object[key]) || (!schema[key].optional && !schema[key].validator(object[key]));
        })
        .map(key => new Error(schema[key].message));

    if (errors.length > 0) {
        return errors;
    }

    return []; // empty array means no errors
}
  