import { Injectable } from '@nestjs/common';

class Person {
  constructor(private readonly birth: Date) {}

  public getBirth(): Date {
    // return new Date(this.birth.getTime());
    return this.birth;
  }
}

class test {
  public static dateFuc() {
    const data = new Date();

    const kim: Person = new Person(data);

    const birth = kim.getBirth();

    console.log(birth); // 2023-02-13T15:02:11.783Z
    data.setDate(40);
    console.log(birth); // 2023-02-13T15:02:11.783Z
  }
}

@Injectable()
export class AppService {
  getHello(): string {
    console.log('test');

    test.dateFuc();
    return 'Hello World3333';
  }
}
