function main() {
  const forms = document.querySelectorAll("form");

  for (let i = 0, len = forms.length; i < len; i++) {
    let tab = [];

    console.group(
      "HTMLForm quot;" + forms[i].name + "quot;: " + forms[i].action
    );
    console.log(
      "Element:",
      forms[i],
      "\nName:    " +
        forms[i].name +
        "\nMethod:  " +
        forms[i].method.toUpperCase() +
        "\nAction:  " +
        forms[i].action || "null"
    );

    ["input", "textarea", "select"].map((control) => {
      Array.from(forms[i].querySelectorAll(control)).map((node) => {
        tab.push({
          Element: node,
          Type: node.type,
          Name: node.name,
          Value: node.value
        });
      });
    });

    console.table(tab);
    console.groupEnd();
  }
}

main();
