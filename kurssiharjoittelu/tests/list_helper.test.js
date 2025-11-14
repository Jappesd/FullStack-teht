import { test, describe } from "node:test";
import assert from "node:assert";
import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from "../utils/list_helper.js";
describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("favorite blog by likes", () => {
  test("of empty list is null", () => {
    const res = favoriteBlog([]);
    assert.strictEqual(res, null);
  });
  test("when list has only one blog, returns said blog", () => {
    const res = favoriteBlog(listWithOneBlog);
    assert.strictEqual(res, listWithOneBlog[0]);
  });
  test("of a bigger list is found correctly", () => {
    const result = favoriteBlog(lotsOfBlogs);
    assert.strictEqual(result, lotsOfBlogs[2]);
  });
});

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const result = totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test("of a list that has one blog equals the likes of it", () => {
    const result = totalLikes(listWithOneBlog);
    assert.strictEqual(result, 7);
  });
  test("of a bigger list is calculated right", () => {
    const result = totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 18); //5+10+3
  });
});

describe("most blogs", () => {
  test("of an empty list is null", () => {
    const result = mostBlogs([]);
    assert.strictEqual(result, null);
  });
  test("when list has only 1 blog, returns that author", () => {
    const result = mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Sam", blogs: 1 });
  });
  test("of a bigger list is calculated right", () => {
    const result = mostBlogs(lotsOfBlogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    const result = mostLikes([]);
    assert.strictEqual(result, null);
  });
  test("when list has one blog, returns author and likes of it", () => {
    const result = mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Sam", likes: 7 });
  });
  test("of a bigger list is calculated right", () => {
    const result = mostLikes(listWithManyBlogs);
    assert.deepStrictEqual(result, { author: "Bob", likes: 10 });
  });
});

const listWithOneBlog = [
  {
    title: "Single blog",
    author: "Sam",
    url: "http://example.com/single",
    likes: 7,
  },
];

const listWithManyBlogs = [
  {
    title: "First blog",
    author: "Alice",
    url: "http://example.com/1",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Bob",
    url: "http://example.com/2",
    likes: 10,
  },
  {
    title: "Third blog",
    author: "Sam",
    url: "http://example.com/3",
    likes: 3,
  },
];

const lotsOfBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
