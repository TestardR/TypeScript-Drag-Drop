// autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById('project-input')!
    );
    this.hostElement = <HTMLDivElement>document.getElementById('app')!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.formElement = <HTMLFormElement>importedNode.firstElementChild;
    this.formElement.id = 'user-input';

    this.titleInputElement = <HTMLInputElement>(
      this.formElement.querySelector('#title')
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.formElement.querySelector('#description')
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.formElement.querySelector('#people')
    );

    this.configure();
    this.attach();
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // this.formElement.addEventListener('submit', this.submitHandler.bind(this));
    this.formElement.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

const prjInput = new ProjectInput();
