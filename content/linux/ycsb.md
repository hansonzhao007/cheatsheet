# Install Java & Maven

## Install Maven

```bash
sudo apt install maven
```

## Install required tools and libraries

```bash
sudo apt update

sudo apt install clang libboost-dev libboost-test-dev libboost-program-options-dev libboost-filesystem-dev libboost-thread-dev libevent-dev automake libtool flex bison pkg-config g++ libssl-dev automake libtool make libboost-all-dev git python-dev python3-dev python-setuptools python3-setuptools autotools-dev libicu-dev build-essential libbz2-dev libsnappy-dev
```

update `Library Search Path`:
```bash
clang -Xlinker -v

```
# Install Libevent

```bash
wget https://github.com/libevent/libevent/releases/download/release-2.1.8-stable/libevent-2.1.8-stable.tar.gz
tar xfvz libevent-2.1.8-stable.tar.gz
cd libevent-2.1.8-stable/
./configure --prefix=/home/hanson/program/usr
sudo make -j32 && sudo make install
```

# Install boost
<!-- 
```bash
wget https://sourceforge.net/projects/boost/files/boost/1.65.1/boost_1_65_1.tar.bz2
tar xfvz boost_1_65.1.tar.gz
cd boost_1_65.1
./bootstrap.sh --prefix=/home/hanson/program/usr
sudo ./b2 -j32 install
``` -->
```bash
sudo ln -sf /usr/lib/x86_64-linux-gnu/libboost_system.so.1.65.1 libboost_system.so
sudo ln -sf /usr/lib/x86_64-linux-gnu/libboost_thread.so.1.65.1 libboost_thread.so
```

# Install Thrift

## Install Ant

This step guarantee that Thrift can find Java Library in the next step
```bash
sudo apt install ant
```

## Install Thrift

```bash
wget https://github.com/apache/thrift/archive/0.10.0.zip
tar xfvz 0.10.0.zip
cd thrift-0.10.0
./bootstrap.sh
./configure --prefix=/usr/local
```

At the end of the output you should be able to see a list of all the libraries that are currently built in your system and ready to use with your desired programming languages. If a component is missing you should download the missing language and repeat the above step.

```bash
thrift 0.10.0

Building Plugin Support ...... : yes
Building C++ Library ......... : yes
Building C (GLib) Library .... : yes
Building Java Library ........ : no
Building C# Library .......... : no
Building Python Library ...... : yes
Building Ruby Library ........ : no
Building Haxe Library ........ : no
Building Haskell Library ..... : no
Building Perl Library ........ : no
Building PHP Library ......... : no
Building Dart Library ........ : no
Building Erlang Library ...... : no
Building Go Library .......... : no
Building D Library ........... : no
Building NodeJS Library ...... : no
Building Lua Library ......... : no

C++ Library:
   Build TZlibTransport ...... : yes
   Build TNonblockingServer .. : yes
   Build TQTcpServer (Qt4) .... : no
   Build TQTcpServer (Qt5) .... : no
```

```bash
make -j32 && sudo make install
```

# LevelDB install

```bash
git clone https://github.com/google/leveldb.git
cd leveldb
mkdir -p build && cd build
cmake -DCMAKE_BUILD_TYPE=Release .. && cmake --build . --config Release -- -j 32
sudo make install
```

# Mapkeeper

If you change the install location of Thrift, edit `Makefile.config` file to point to your location.

## Mapkeeper install

```bash
git clone https://github.com/wiredtiger/mapkeeper.git
export MKROOT=/home/hanson/mapkeeper
cd mapkeeper/thrift
make -j32
# make sure gen-cpp/ folder has:
# libmapkeeper.a   Makefile                 mapkeeper_constants.h  MapKeeper.cpp  MapKeeper.o                    mapkeeper_types.cpp  mapkeeper_types.o
# libmapkeeper.so  mapkeeper_constants.cpp  mapkeeper_constants.o  MapKeeper.h    MapKeeper_server.skeleton.cpp  mapkeeper_types.h
```

## Install LevelDB

## Bind levelDB with mapkeeper

enter mapkeeper directory, enter leveldb directory

```bash
cd mapkeeper/leveldb
make
```

```bash
there are some errors:

edit the Makefile document as follows:

include ../Makefile.config

EXECUTABLE = mapkeeper_leveldb

all :
    g++ -Wall -o $(EXECUTABLE) *cpp -I $(THRIFT_DIR)/include/thrift -I $(THRIFT_DIR)/include \
        -lboost_thread -lboost_system -lpthread -lboost_filesystem -lboost_program_options -lthrift -lleveldb -I ../thrift/gen-cpp \
    -L $(THRIFT_DIR)/lib \
        -L ../thrift/gen-cpp -lmapkeeper \
           -Wl,-rpath,\$$ORIGIN/../thrift/gen-cpp            \
           -Wl,-rpath,$(THRIFT_DIR)/lib

run:
    ./$(EXECUTABLE) --sync

clean :
    - rm -rf $(THRIFT_SRC) $(EXECUTABLE) *.o 

wipe:
    - rm -rf data/*
```

run `"./mapkeeper_leveldb -d ~/mapkeeper/level/data"`, which means leveldb server is running!


# Download YCSB
```bash
git clone git://github.com/brianfrankcooper/YCSB.git
cd YCSB
mvn -T 32 clean package # # Builds with 32 threads
```

# Run YCSB command

## Basic Test

```bash
bin/ycsb load basic -P workloads/workloada
bin/ycsb run basic -P workloads/workloada
```

## Mapkeeper Test

to see if it work

```bash
./bin/ycsb load mapkeeper -P workloads/workloada
```

# Reference

- [SETUP YCSB & MAPKEEPER TO BENCHMARK LEVELDB](https://shingjan.me/wordpress/index.php/2017/03/29/setup-ycsb-mapkeeper-to-benchmark-leveldb/)
- [fatal error: Python.h: No such file or directory](https://stackoverflow.com/questions/21530577/fatal-error-python-h-no-such-file-or-directory)
- [Thrift installation](https://thrift-tutorial.readthedocs.io/en/latest/installation.html)
- [YCSB Benchmark](http://life-sucks.net/blog/ycsb-benchmark-en.html)
- [The method of Compiling mapkeeper temporarily](https://github.com/brianfrankcooper/YCSB/pull/262/commits/3b6c38926f9876a2127a1c1b6946912c3cdbea9e)
- [Ubuntu Setup YCSB &amp;amp;amp; MapKeeper to benchmark LevelDB](https://blog.csdn.net/szyjsj/article/details/695677570)