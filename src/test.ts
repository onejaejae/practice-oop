import { ClassConstructor } from 'class-transformer';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type IBuilder<T> = {
  [k in keyof NonFunctionProperties<T> as `set${Capitalize<string & k>}`]: (
    arg: T[k],
  ) => IBuilder<T>;
};

class BuilderCommon<T> {
  protected object: T;

  constructor(ctor: ClassConstructor<T>) {
    this.object = new ctor();
  }

  build(): T {
    return this.object;
  }
}

class House {
  name: string;
  address: number;
  size: number;
  isOwn: boolean;

  test() {}
}

export class HouseBuilder
  extends BuilderCommon<House>
  implements IBuilder<House>
{
  constructor() {
    super(House);
  }
  setName: (arg: string) => IBuilder<House>;
  setAddress: (arg: number) => IBuilder<House>;
  setSize: (arg: number) => IBuilder<House>;
  setIsOwn: (arg: boolean) => IBuilder<House>;
}
