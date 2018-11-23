# Introduction

CMake is a cross-platform build system generator. Projects specify their build process with platform-independent CMake listfiles included in each directory of a source tree with the name `CMakeLists.txt`. Users build a project by using CMake to generate a build system for a native tool on their platform.

# Using CMake with executables

Lets assume we have a simple app with a `single .c` file.

We by creating a `CMakeLists.txt` file in the root of our project.

```cmake
cmake_minimum_required(VERSION 2.8)
project(app_project)
add_executable(myapp main.c)
install(TARGETS myapp DESTINATION bin)
```

* `add_executable:` defines our binary with all linked source files. (针对 c/cpp 文件，生成可执行 bin 文件)
* `install:` tells cmake to install our binary into the `bin` directory of the install directory.

# Building

CMake supports out-of-source builds — so all our compiled code goes into a directory separate to the sources.

To start a build we create a new folder:

```bash
mkdir _build
cd _build
```

And call cmake with the path to the project’s root (in this case the parent folder):

```bash
cmake ..
```

By default cmake will install our build into the system directories.

To define a `custom install directory` we simply pass `-DCMAKE_INSTALL_PREFIX` to cmake:

```bash
cmake .. -DCMAKE_INSTALL_PREFIX=../_install
```

To run the build script you can simply use the Makefile:
```bash
make
make install
```

We can now run our binary from the install directory:
```bash
../_install/bin/myapp
```

If we wanted to use a different generator we pass it to cmake using the `-G` parameter:
```bash
cmake .. -GXcode
```

# Using CMake with libraries

Building our own library. Use `add_library`.

```cmake
cmake_minimum_required(VERSION 2.8)
project(libtest_project)
add_library(test STATIC test.c)
install(TARGETS test DESTINATION lib)
install(FILES test.h DESTINATION include)
```




# Reference

* [Useful variables](https://gitlab.kitware.com/cmake/community/wikis/doc/cmake/Useful-Variables)
* [CMake Community Wiki](https://gitlab.kitware.com/cmake/community/wikis/Home)
* [CMake by Example](https://mirkokiefer.com/cmake-by-example-f95eb47d45b1)
* [Minimal CMake Example](https://github.com/krux02/minimal_cmake_example)

