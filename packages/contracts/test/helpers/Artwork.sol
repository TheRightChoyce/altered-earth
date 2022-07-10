// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library ArtworkHelper {
    // --------------------------------------------------------
    // ~~ XQST data files ~~
    // --------------------------------------------------------

    function getXQSTFile0() internal pure returns (bytes memory) {
        return hex"0140400100000003060c07ff05170cff041e15ff0a4a41ff15614eff073427ff123b28ff416f5aff2f5e41ffc0c0c2ffabc36fff96a872ffa7a6abff5a7668ff718176ff8b928fffafb5adfff2f2e5fff4f3f1ffdde6ceffc3df89ffebf4d9ffe6f0b3ffe6ece5ffbbacb1ffdcc9d2ffddd5d9ff87ac1bff77a307ff70930bff638209ff718e27ff475f07ff323f0bff3c510aff849f3bff677e35ff808584ff373b38ff595f5fffa0a0a2ff897a6dff0d1404ff161d08ff030402ff031414ff092d1bff276f56ff246328ff1e4d35ff87a293ffd2cecaffe8e0e4ffb4b5baffd2ea9fffb0d45effd5e4b3ffcfdfa0ffacc951ffa9bc8effcdbac1ff7d8b5bff859851ff91b71fff8eae2bff90aa3dff51700dff506211ff475821ff374a0fff959696ff737072ff8c8888ff978d86ff5da2c4ff2a7780ff8fad50ff83a123ff6a6c6bffd3ddc7ffc7e070ffcddab5ffbcc79affc8c7cdffd6c3ccffa1ab91ff9cba5affa0c84aff8cbb41ffbace84ff7fa413ff658c0bff5b7226ff738142ff7c797bff0a260fff1b3a11ff063c31ff0e4e29ff80b087ffabcf98fffdfdfcffe4f1cbffbbd76dffb9da3dff88936fff769c19ff82ac08ff283508ff4c831eff1c5517ff5d8771ff9d9d99ffa7cf2bff9eca24ffbedf52ff95c50aff62704dff32322aff4a9532ff477e46ffb3c3b2ff94bc10ff87a36cffabd917ff8bb70bff9eb845ffa0cf10ff5c790cff788f46ff58613dff525050ff13130fff2d301cff1c2808ff022220ff2d7f57ff5fa02bff38721dffb7dbb3ff9ec536ff688320ffbdbaafff717e5dff626561ff222217ff3b4221ff0d3a13ff6ea943ffd0efbaffc3cda5ffa9b3a4ffc4e53eff9ac222ffa9bc56ff939a85ff2a2925ff3c713bffacd73bffdff08dffb5dd26ffdbf078ff9db873ff4b5e38ff47433cff57985effd0ec5aff464846ff4f9849ff76982cff22231eff675e51ff2d6513ff88bfd3ff6ab91fffe5f45affdbf041ffadc938ff7c6958ff3b372eff1e4825ff595f51ff789371ff175e36ffc0e32dff99b830ff57763eff3e4c31ff473c2fff737368ff72b372ff8a7e81ff1d1b14ff2b7e33ffa89e93ff54503fff485e53ff928977ff2e2215ff768711ff6d9889ff685644ff2e925cff226e3bffafa59fff629041ff9cdd7eff7f8475ff98a65eff8ecb7cff6b6065ff94ab82ffcec8b9ff77bd5fffc0ab99ff032926ffbed254ffa2948dffaf977dff499d70ff69a966ff97b19bffa0826cff583e29ff77d29aff6d6c5dff392e1fff8f765dffa3795cff648758ff9ed4a8ffb3f5a5ff7e7370ffbca289ff906f4eff644a33ff79a156ffb7b56fff473420ffeddfd6ffe1d5cbffddcabbffcdb299ff2c4f24ff8b6346ffd0baacff765d4bffddb59cffd1a285ffd1a994ffbe8d6effa6e2c0ffe0beadff7e563affecccbcff49d27aff000000000000010202030405060708090a0b0c0d0e0f101112131413121512151616171018191a1b1c1d1d1e1d1e1f1e20212223242525262728292a2b2a00002c00000000002d012e2f0730073132330934100e0e0c35361136373615381315393a3b093c19193d3e3f400a411c42434422454522460f474834492a2a2c2a2c0000000000010101024a4b08300832174c4d0c4e4735284f121439173450394f5139525354193455565758595a5b5c5d432222434346465e0c17282a2a2a00000000002d5f0160052e046162316364653b24280f4e350c13121251366611675068153853545434696a236b5a1c5d1e1e435c452020280c25461026216c2a2a00000100005f02026d6d626e076f654f170a400f70255334391366671339377168727374535454540f3e3e1d1c5b1c425c752243202035350f4725766c212a002c000100605f012d6e771b781717657912657a7b5e5e093459393914157c7d7e7f7f1c7d535418190c7a1f80801e23812482241f1f1e35092528838485862a002a002d870101022d6088898a8b65651365123a0b462509343759683a741b7d8c717f237a533c3c3c0c6b5c8d1e1d245c815c338e8f4235354690269192868400000000005f0102936e8a30779467659565115096970f1265679871990a9a673a377d72992854541a0c7d7d415c1e6a23241e699b1e69353546259c9c856c6c2b00860100010101876e5b9d778c9e9f166565a00a0e273465a1a07c689e367472593fa2401a3c541925746b24a31d3e1f5d1c5d813e69350c4725a4858521862b91600101010160938a8a77a517a6a614656513532810343413143a141373509e14597174181954340f1b1c6b8da31d5a1c1e1d5c1d5535531028a7839221862b2b2b6293015f939330a8897c9e7351166565653397103434138c381659377c8c3a507f7435545434466aa95c4d5a231d7a4d4d3d5a351053464e76aaab22862b00016160ac936e938a8a77adae57afb065651779108e343412595150b17c7e593f571f231a543c1a0f24a981a90b5da33e4c421e4c532870355ea7b2b320226c2c01b430308a8a6d306d8963987f9fa1a136673b79101934124f594c729967993f991b4c09181954286a8d1f1f5d5ca3b5a9808133530909460f91b3913db6212a5f609303036e6eb7b7893036b8379e506796979749346534346639376736387c7e403e35183c1a90441c4db9415a6a24baa7223b090933094683aa862025bb2a5f5f022e6e93628a30ae893757377c9e9e6579799734121a1a9837379e50397f716b3e0f18183c905c6b4d3f5a1c6a8d6a24ba09090c281048bc9191205c442b02602e0362acac30949474a650b89fb0b0658e463234124670665015167f726b6b743d460c3c1abd44806aa924a23a1d1d1b4d5346350c3583aa91842b45aa2c5fb4426d6dac8a7877be376458b868b09f65099bbf191a2848123815a17f7f7d7d74484635091a27425c23235ba2406a561f0b09101a47285eaac06c21002c00602f050503c17837a5730a9e687cb8b0af12c2555e1828460f116565657c747f7ab9464e4e4828835c1e1c23410a8e5d81695d090c8e464870c391002c43438605032e034b04b78caf4c577368b8b898b01649b54e10284648656565117c7174990a470ec4480c835c6b1f2316a17c140ab1a035101849c50cb3c62b2145c76c0102874ac82f624b889494578c9972a666650c4e4e70467025661311117c7474743d4e904e7048267b3a7a571b5a0a0b415a9a48108ec9c38676916c860022210202024aca6262c1cbcb899eb0a0b868166535472746970f483938175074741d5a3d4e5e0d47bfa77b117267527a41a9a9800b29ccc2c3769caa9185862c2a802e2e93772f30b7b7cda563ce7cb8b817134f0f0ec4cfcc1046d0a07c7f1b1b7d6b5e272747705e271a12517d5b8d5d92924db57033bda7bca4c085442084002102069d2f03b762b7c1a8d173989e1452331397bdb5259710703e7f7c746b5a991b8f275ed2bfbf903413131b1da7915a8c414ec270cf83269caac0c740002c860561039d3030a830c157d173579e570a4c50554e08d31034535db9747a8c991b1cb590250f25bf26ba0a3e26808d1fb87c25bfd4cc499bb3b38491c0762c2c00b74b0361b762c17789d56358738ca28c40507bb5079b8e4f3375716b7a7a746bb990475e28185e2626babb6a1c1f5a997446283333d6c2c9c300853ec0002c2c3103d70505040477d5d1d55859d8419ab19a750e4e97797979bd527f997a1b40414e474897465e26a313591d7d6b1c4cd8d9cc18ccd9da769176918d1e002c2c0602022e2ecb30c1dbdcbe57d83a8ca10a0a690e0e259bdddd907e7eb91b565aa99025460f484726b63b596b3f6b5a23b1cc33c229debdb39cdfc01ec72c2c2c872d022ed703b7c177aedc71b068b1685067d30ea5a563e04f4e56b9993e8175e14e27c8465ed2831357991b3f72b95c3d49d449dac5e1abbde2c092862c2c2c2dd7870503032fcbcb999e9e989e68a6a150cfb6a563638b135e1b3f7a500a75bd90906f25bfd2a7a27a1b6b1c9ad85b75c24949b2e3b2abd291842121002c2c5f310404b7c188a8a856a6a6b1b0987371a08fb6dc6fdc8b4f0f3d7e3e9b8159b5270d5ebfd227a738a1985a6b6a4d8d49d9d62929da29b3a791c6423e202b2c8761034bb7ca4bdcbedc3768b0a6afa6678c75b6b6dcbe8b95c23e0b9a69990ab5900e0e25d283831250985a6a68413dc5d9c22848b2e126aa91c01e1e206c2cd76e6e6262cbcba577dc5668b8a098715771e1ba78b6d18b958e3d9ad0a6a13e754e4e5e5e2726269e7f7d5b5b5a6a49d9d949e429b28384c0c0c05c406c452c87616106620488ae7794776898a068d83a714ebae5bee695953cd03938507f69754e32475e83a7267fb11b6a426a5b29498ec2d9e3a4c9c0849caa431b6c2000d76105b74b04a814d8585868a0b17e1f415d8f75e5d164e79534d3a19e3914bd75bd25d247839caa5a56a94d1d9224e88eabd9e9ea76c3ebe2849222226c222c8706030404db589ed1945872684da37e73d075cdec55524f1511ed9f163913e1b5c8c8474783769c566a5b23818dd0e12949c5bde883abbceec0441d4585442c02d76105610488d5cd589e8c1fb16750af7e89a89dd1646495ef1a1211179fe190ddd22547a79caa241f801db981dad618d9dee1a476a476c0c0456b1d221d9102d7056103882f947894cd239968afb8a640ba77dcce649515ef34171566138f082747e848769c85801b8d6b1f81d933d4c249aba47676769184433f6a202086022e05b46e6230a878084d7e68b8a673a081cdd5ced1114f15161a1666159b75075e4ed2d2bcaa441f8d5a5a3fdac2f0f1f2deb57676eb85aac01e8d4245216c5fb7616a7204b7949d583f719868733a3a24cdd1d1d34f6695113336363675cf07830de84e76aa4423231f4099e9d6f0f1dab2b39c91ebe284914d80424545bbd7b4d777f3306e3178a5ec4c3e68b1b83781cd3b697bd3e7959f333636d08207a7905e0dc4aaaa5c5c1b8cb18cd6d9d6d6e9eaaba476e2918485929a8f8d8d452d02d76262cb06cd786fba6a586868b8507bba7bd3d3e7e7369fd467142482a72547275ea4aac0426a99b91b71c529e9f2b2f4c9e276e291c085447e4c44928602d70503b72d3177ec944c9999d87e5757e594d5e55164ce51a152a66744a4c4100f4e4627e2aa5ab97c7fb8d0daccf2e9e3e3c9a4b3bcc0e280201f816c862a2e2e2eb461b4cba8944c56584167599e57cd9de555cece6438a155145992c36fddbf2546a7bc9cb95d7a3f68dac249f5c5e3b2ebf67676eeee4322d05c91862a872e61032fcbcbcb9db67b8c7f997e56a2cfe5d5d57bdd523616527356a4bd703228d94783aac07a99ed5941e9e9f7dadee3f4b2c99c9ce2aa851e7a1dc0212ad7d787043131ca6d6dcdec71b89873577b9bb6a5a50eb63b141696513e82c39710790fa7b5c0847f99999aede9d6f8f9b2b2c9f6eb76aac691c0224dc76c212b01d706876161316eaccda94d3f7198373d9bb6c5d3f5d3558e395959bbbb0dc8c8cc100d8884847f9ea099daf5d6e9f7f8b2b2f6c976e2c6912a2b1fc7202a865f61052e026262acac6d1f4d7a7173393d55d3d355d4ef11f0969f96bb3125dd10cccc0ec4aa84a0733a23dae9f5f1f9f7e3ebc9f49caac6c02a2a1f806c2a2a010002d70506b4f36de57ba940719a0a9b52559b55f1f08e38ef59829c0d6fdd0fe6105ea49caa9ea0a0d8f2f2f9f8fafaf6e4f4f6b39c91c0c02a2b4343862a2d01012e93936ef38a1ca91f6a68680b55d4d45596d4f034ccf13e8592c42732fbdd97e8a49c26d8a0a09ad6dafcf9f8fafae4fddfbcaac0c06c842a866c2b2a2c2d01056230308a8a6d6a4c8ca1a6c555559bd41317111212f17585a30e320fdd4f8eb30784bb673a3adadae9fcfee9f7faeafdc9bce2c08420452b2a6c2a2c00015facb7309d9d891f6a4c406898d369e13d3d3b111134343c8ff3bb0e46460fdd09aabbc0ba7e56edf2f2d6fefef2f7f8faf4f6b3e2c0844280002c926c002d022e62cb31088a6d426d1e1d23eccf8269e15533f01711fed1bbb42f4610dd328bdda7769c8256a6daf2e9fefefee9f8e4e3f6c9bc85c0c0922b2b842c862a2d025f2e06b406b4f322425b8d1f5dc39b8f3dd38e0954333cdc9d620832dd0f79793283769c753636f8f2e9fefcf2dafae4e4fdc3bce291c092916c002c2c2a02020202022e08f3f3242423a9a98f75699b974f544952f1c297b60dc832c8d279dd8e269cc0bb14cef2dad6fefcfcf9f8fafaf4fdebeec6c01f4320212c2c0000022d022e0631b4f3a96a244c1f3d555527908e33d451efeff0b50d31289ba710c28e9caaaaa314a2f7d6f5fef5fef9f8dedefdfdebeec6c6c74322212c2c2c000002d7050606608a2481248d97709b4810b6963313f0344f13974e4979d9c483cfd6a4b391a3a2f8f9daf5eff1d4f9e9e4e4fdfddfdfc0c0c791432a2b2c2c2d2d2d02022e2ef38acd7b8d80c569bd82554fd4f0f0f0e0fffb10463cd4c20da7bde1849caaba59f7fcf5fef1f5ccdae3c9f4f4f4dfdfc0c044aa43002b2c2c2d2e2e2e2d605ff3f3855ca95cb3a3bd49bd4f4f3335288863e6dde6fb54cc83bdc3abc0e2c0e5d6f7d6d9fcf5f7e429def4eafddfeedfc69121c022842b002c2d2d0101012e5ff3f39221a2a385a3a710cfcf13ef180c5edde055e0fb09709090abbcaa008524d4f5c5e9f9f2b2e4ebc3f4eafdebdfe2c084218543862b2a2c872d012c2d020160b44544ecbbc39ca755498fd3c2cc488863e06fbf348ed9d2b5b5b3c0c084e3f2f1f1dae9fadef6ebf684eeeec6eec6008444912b2b2a002c87872d002d062e6085bb4475c3c39cbd49bf9bd22918e8086fdb31b53309cce8b5b29291c0b3daf0f0f5daf5f8b2ebf6e29191c6e2c6c600846c2b8584212a2c2d2d002d2d060684864543922692757590e15596338ed9c22707cacc252849a79076c0aac6e9f2fcefeffef7daab29f6c6eee2c6c0e2c68484212a2a2b00002c2d87002d61d706866060f392aa83a70ee8554ff11ad4d9bfd2080d9b4e9b5e26a476c6c091e9fcfcfefef7d6e3b2e8b2a4eee2c6c0c0c684846c002c2a00002c01860000015f00008444b576aac0b3494949d93cd4cc49bdc4cbcac4a7d283a7a4b2e29cf6e9f2f7fcf2fcdae4deb2bc9ce2eeeee2c0c08400bcdfeee284002c";
    }

    function getXQSTFile1() internal pure returns (bytes memory) {
        return hex"01404001008a000363777fff7095afff83abc5ff75a3beff92b2c7ffc7dbe1ffede9eeffdadee0ff776e68ff5c514bff8e887eff352b27ff756466ffa19f9fff7b7472ff5f5654ff7b6a61ff6c625eff3d2f32ff6b6767ff191211ff3f3a36ff665d59ff0f0b0cff473d38ffc3b7acff9a8779ff4f443fffada39fffb0a8a5ff6b585cffb6a7abffc6b7bcffaf9fadffd3beceffe4dae5ff745364ff5e4c54ffcacac8ffc6bcc8ff523249ffaa8ba3ffa28e9cff988089ff7b6271ff765d69ff7f6b6eff5c5a5eff535a57ff251f1fff49575dff72838dff2b2629ff221a18ffaec3caff83a0b5ff89b8cfffd1cfceffa4978affb5b2b5ffb8b2abff3f342eff322623ff58473eff3a3029ff887e77ffa39a96ff878686ff5e6364ff65564bffd5d7d9ff99898effe0d2d2ff857273ffa79facffc1afbfffe0d1e1ff9a8397ff2f1b2cff8c8191ff664e60ff65455dffae91acff8f7786ff8a6b7bff484e50ff373138ff3e3640ff637f9aff938e8bffc0bcb7ff060404ff4f4035ff81746affc0c2c4ff999794ff5d4b44ffa9a8a9ff9b8e96ffded7dbffc1adb4ffb7b7bfffcec3cfffd7ced7ffd9c6d9ffc2a2c2ff886c85ffcaccd3ff826377ffc18ba3ffa0738cff705c68ff686671ff4b4947ff352f30ff99c1d7ffafcfd9ff9a918aff1b1618ff2c2221ffadabb5ff918176ff756c73ffd6c8ccffc8b3c3ffcba6caff9d789dffc0b9c4ffb9aabaff5c4254ff6d4668ff4a3c41ff82635fff424341ff8699a6ffae9e8dffa2927fff706154ff564a49ffc9c3beff7f7a7aff211220ff737982ff7b8e99ff776757ff4f3739ffcbc2c8ffb49baeff765275ffa484a1ff5b4e5fff678b91ffb5ae9eff6a5a51ff635044ff6f5356ff372430ffb99db8ff817685ff619fb9ff8faeb8ffabb7beff93806eff89786dff8f7f82ff462f3aff7e6c7affa2b1b6ff837063ffccbfb4ffc2a894ffceb9c7ff736679ff967890ff523f4bffa99f99ffb9b8b7ffd5c9bcffcaaca3ffbaaaa1ffddc9cbffd1c2c2ffb4a4b2ffc1afa5ffa5857fffb8a0a2ff9e7f8eff9b8fa0ff865880ffb894baff91708cff3d243aff516067ff524a53ff918985ff9b8c83ff987277ff8c6974ff946583ff482846ff5d6b6fffaa969effab80adffa396a8ffa48e93ffe7e3e0ffb4a498ffa28f88ff907579ffb398a2ff6a4952ff3ba439ff637949ffbd99acff4d762fffa68493ffb69795ffa08388ffbfa4b3ffac9991ff89757bffbca2aaffd8d0c7ff675663ff76707dff82798bff6e9548ff928e9cffbfc5cdff576137ff605c6bff453e4cffecd7ddffe2c8d4ff7d5955ffd7bdbdff9ea8b0ff959ca8ffac9094ffcbb5b3ff906665ff967d7eff465827ffad8d88ff87b66cffd2b5c1ffd0abbcff898b97ffad7f98ff7d838effcc9bb0ffdbbcc9ff9ea1aaff97a363ff548b99ff437583ff000102020302040505060708090a0b0c0d0e0e0f1011121314091516130b171418191a1b1c1d061e1f202122232425262728292a2b2c2d2e0c2f30313233343501360237023838360506393a3b3c193d3e0b0b3f3f18400f161641421c43443d1245103b464748494a4b22224c4d4e4f27505152295354492e2f5531565715345803013802020204360659411c5a0a14145b405c5d0b35130f1009265a5e5f183f406061266263646566676869506a4a6b6c296d6e5154256f2f703400715672005801730203047405074126755d3d76145b5b1477177671093a757846075f0c79413f5f3b7a7b1e6306237c7d7e237f23808182281717175b838455333485720303013802860273736159878889358a15145b5b5b5b72178a8b8c5e461c5a42890a3d5f755a6421630606225029234606665057568d3172345b778e8615157201038f043773730473435a875c4014777635147285145b1443193c26393e1b5c905d91080f2b9192664c4c9394684c2366237d9595214f965b318377128356153897373738747373733c983a991777341417767215175b7113191d5e3c1d989a897945088a9b9c927c684c4d7e4c7f6346669d27669366219e76171b9b09561b589f01a0387374a10d5a989a9018715b5b5b5b171717318c3c0a085f0a485a88a245a3a4472da5667b4b684d826766464c4b2367672780a6579c8a35720b607201038f38047474a70d8890a84572313118175b5b5b5b0f43428a0e3c0da975aaaa9916131d4925ab63687d52ac274b4c6867237c5252adaea68c727235097977000155008604740a89450ba3098c0e15725b5b5b17426b5aaf3bb05a1d3c5ab1b29a6060b3b42db52280214bb6a64f68804c687e6a179c516c3b7a310f0b77350133323702378c16405c405d448c4372857617311539461c3a5e5a1d59264279b71c7984b87bb9ba54bb4a53adbc6a7d9d68bdbebf8d175095804a0b127a564070c0028604a00d3d76c1168c5f0f08113da4a409080c0eaf5a1db51cc23913168c8910afc3b8c4c52cad527ec6c74ebebdbd7e8d8d175b9cbe80397a17834485c8c0c837a0865f40158544596143591b401d420fc93b921c1f5a751c422613110e4908163d1ec5a581c6c64ebfc76acacaca7e8dbfc74e81cb7f26b01776578f555533868e8c3b1018133b5f590db00f350d64cc204b676320cd7b1f1c082fcecf59081b0fc3491bd09c28adbd82c77ecaad95819cbf8d294b66397f260b348f85c08f8f330fa25d418c615971b05f1b404764d1649266677b64b562591b8cb387083d8a081049d2c96c6c9dbcbcbc7ebdbc944ec7c78d52697f665e39c11b8f8530442f3389593c0811597a430d8c0f3ed3d4931f218027207f274742415fc28711411175c210490c2d5351829d6cbc51bf8d4ec74ebd7d4badd5b6927ac28c5655c8308e7141423ca2c3af703b4fc945d6d40ad792274b21277f473cb0391daf0a75c2423fd810c9d96c2851be4e94c78d4e28825152ab7f93d5da200e61115544c82f44c82f2619cea3a40c71c1622063ababc9a689c21d92212a0daf263926dbc35ab3a3a3590e120e6f50bf51c7bfbfc78d4e5252274b654da4612e0f138530303030c8008b46a98841dc572f4a664b20217cb679d6d42092a4b5635a268ba9b3db5d99151f8cddd754a66a81c7bfbf8d4ebe2995ab52b667b0dc8a1b13158555303055303906a9de9ea4709e476f2ab64bbb9e674b1ea490637b928b3c64dea9c3db598b617bb5cd2164a5ae28bf507e4db667229582aedf12a51b1e0f1515718571552f63b0deb7650ce0a62ac96723214aac4d66b7d47b6648a9cd9226cedeb75d3b5f5e1c3967c950129c8da5bc7e4dab9d95be9cae5083ae8a720e15851b117111418b0db58c0d8a47256f575672cb4a4fe18ce2c92306cdb5193942cd481aa30d09ce598b3c77145b5b768d816c54be7c9d4bc7814e7735120e8c8e435f435faf751aa4b1c90f347a57259c3577a621e3bbe10e64920623cd20398bb1191ab35a083c433c6372355b147634df6a2a4d69ab662ca6ae3583118c130d657436e4613c8b989ae0e07adfa612e5e59657e64f9eace71edcb5b5e88b64b3b1cf8b393b8c39591683148ac51257c1ac21b622e9066253d712eadc0e0d71a0a0360574e426398b892ec1dc49a60f30d4e19ecbe1e1e6e79c9bcc48eb8ba9cd1acecd5a430d633b15161e499bd2df6f52abab6ae922dc2cd2c4d23f131309a0ecede4361c638b3c0fc108183d5ce5e2dfa57cb6677fe170e0c9eeefb9ef1ab2cc465e63851c395a09d864491edf5321b6804d64da2bdc83d2f084f11d49af5f755fa7613b63cf75a8dc2fc1f2f2d6d3092525b6b621e1e1e1a6d9b40cb2dbb2a8f35e2613a4424983db1cd1a47a4b227c298ddf4bb6532484849aa319efde08410eafc207065a3c111872aed4f4e2f48853d710804be1e1e6e62bd12020f0d8b8dbb0398c61b811d0b9afefabe9215222e19ebe29a52147b284a24584a39a4483448c393946b7c3a33bdfa4c92bafabf593dad16f674a4face62bbab4a9aaf3c4b85fb09e420f9b101047b564da697c80cb9e694baeae3bb2d8b2b85c3d90a7a1263c3faf98decea8b8b22e2a1f25ba7c93807c4b5366cb9696a620b9b9aaccf37949477a438cb9ef481feedabe9dbd7e6969682307a5d1f3d8873a88b7a9869926429a8c108b0acff31adc64472dd1227c8093d15366b69670c9b92bd8b8eacc1db547138c700cb4ebcc64f66f5252bd7d9369696854eeb2b3c388888808a01c5a3f3143433c5a99eaa347c92babababda22b6b64d4de1e7e353ddd8b7f0f09beab948b962f7a4efb9d0ccf82c7e9d4c4c69c77d68d7f5d8cfb71aa890168f5a3a358c08711d41459a8964d1cc666893937c4bc92ba6cbc14f2ed1b8d8b2d8d2eaebf3f1cc78dfcc64d7b9f895294c060668e7697d82d5d8f3b11988a840f941a8436126610d105d5c8a428a531f7c7b228093532e504de3c9649bd2eaeb48ebddf3eed92be370dd7b20d1d7c6946acabd6896234c936defb4843a19a935f7b0c35f653943071d1b600fa41e793a0a68220c3fd0902dacc9ddeec49bd9b4efb96fd0ee2bc9617884c97b7b6efabebcca7d23bbbd9d68d51d19aaa2871917b05e985fb0595907260dce16df1ad6d6d47cd1daab9a9aa653b5b4ddd0d9a6d821f1ea2a6483577a6b3bc1fb64f5f6e76a7e7d22236a529dd7efaf8879b17577af41795db0850d07464289a87a88d4d43ccc53d1d180cc9eda64b46f81d1cc62cb1fd9206272c12f6161e0d7b4f6f8e7567ebd7e69807eb693b8b4aaa8cea27740a87912260e5e2619c25947dba31942ddd9d72e2dba2a64ab64d1ebf520d0a42e1f62c96f55dfe78e656570aee9fa4da6575681827d95935349b9cf1a9a3f315c791d8375785a5a8b597575cfc3c349d1d9d0df252b4d7b2ada21b420c9f12b20a62bba2de0a6cbf9e365e3c1f66d8396e75728829d2a542bb9b2c35da2413543999079750d5a98afc23c1dafc3421d8c2e49c3cc2d1e64c947c9b4b47bda2ad1daf5f6daf6ad51d7e7e7fce16a5354e12fbb9e967a212c20c4ebeaa3909040ed8c5c98b18c3b5ddbaf3c421d3ab3cc791e258a1edcd9b5ebc9ee207c2accee6dd1d7dd93d554e7dfc155f9e36cd7512ac19eac2f2f572020eef3798990903f3518ce3aa25a5f43594219898ab710902f45890cf1dd9b2048c9477c7b624a7be86a2c4d6f6e2d4dd5e9d7f9edbebac94d2c6c81c12d54ccd02e8a127277778a140e88401b0761b0de3ab30b40181ba85ce5a32bccb52bb420c9212b54bad7b67c935353536c81befbf6f6fc5e54292b53814e91259baef11e18120b990b3e3e1b10410d0d11268bde193a8990cfceb519e2e2b57b8b1feeef7bdd4d7b7b672a53f652214b9329d54facc6f9fc286c548150a5d2d2a5c13f3e0b5c3d3d5c35350cceaf3b5e16618b1919c31089cec3efb1fda3b5ef1c49f1b9b564fbf56767644b93934dcb802229ad296ff9e056282c29d7bf35773e143e35403e40771840353d3c791326b00dcddea919a3a8ceb389c3b719efcf11909a2b47ddabe8f6da67f6a6e152e3556e296a524df7630057bad2a6e7341434763157121431773535343ec209c24646b05ab1de1989903acf1aa8cfb3efb8f1f190dc2ad1c4f6e84be9d5e6bb2daee6c652be5157bb6733e724c62aa6e67283ae357277578a99401435a1890d0e5ecdb0b0a9a3101a88871adbb3cfdbdbdbf110a449d7d74806066729296ea5c157e76e6dfa4f004f80e69cbef5d7537a7a13603f8a3572310b0b3d7636080f42b0b01da9aaa2891188877979b3451acf49b9d0472bddba0678e1d16ef8c6dfe3f996aebc22e3a7e465e64edfdada6e50ccc11e8318153e098a1b5d3deca11175137508a987a845a38988983a5daadeb4ce64c92b2ef1d24a07bb662cbf7ff907e4e6322856e065320078a150adad2d6c2c566f25ae49890b18770b0bec360a1817b0165a1a0916c390a379c3a387b1cdb7f1cc1e25eed24f2778ac6a57e4f7e4a74f705454567f00ed655e8ea59c4e24df8d722edc2e09776035353ea03661a2991159131a103d117990103aafcfa9a9b7ee25498ac524673b7fc596784b5eeced8f63f5fb6a578fa1f7fce661e04f31a5259b832e0f0f4018123d1174a736a81aa27a43905d1b181179db0a75c3a9cec3a80c2a1ec5d7f566b6d5bb6b276527e3f72263e8e94f8e65e44665e1e1e3564e24c431a4160f1599111b1b979797a31b60318c61a3c309091c3caf49dea9afaf2eee252e54fa6df663fbf778e4cb7fbbe67c21f77c4ba6e3e1cbf7e0e02fc11391d235768a09991b098a8a97979787993d7259135d873f081adbdb5ddbcec28cdc1ff1492ef56dd567c6ac4a5ee37fe055804f4ff7cbdaa64a7ffc8e175656e69ca57731838a351216161600fe00a2c30b15423c0988313dcea35d41cf11790c2eccccd06cd7fbabbefae166e0e38e8e55f9e0ac5353e052b4fb807f29579c8d768d9172408aa81534187197fe30ceaf3e161caf8a1a0b40db8711a4f12ef12ed0d92bf1c554fbabadfafcb64af7f7e170f7c0c0c1c1532aabe9e9d5d5969c76175b9c914060890b356009c000440d8916598a31af109960891011a38a09c3a3cfb9ee47dc6cfa2227f8f79e80e1e34de3ec80cbeded4ae1bb274bf5bac977767614a577919a9a18771b77ff00440a458a08774009403fc360890b41111611cff1ccefa62cdcb4d55efae7e74f4ff94a78ede4fced664a78f74f21d1ba2a9c311731a591919a773d310b0bc8c05f410818180b3d3d728910a389181b8aa30cdcd0f1d00c49542092787f6e57e6bb6b6b868633e37f78ecf94b669e96d74f341414129c603f9a3e6035771bc83244130f723577350b3d1699101015181b99a3102bee496f2d5080633b466dadc1e09eedeca7a7672766ededcbfcdfe7dc4f9c7631129160913f3d403e3d77c01717c0c83d0b143e99898a8a10901518451b188a25836f256fa4ddb66be4e8f6fbad868fa16ba16723634b22e39e4e12d1ba834e5683911e3f603e17403d3e851744ffff9f97453f609a908a1b450931608a1b0f1e83a46fdca6b5cc7f6b23fbf6fa2cc88feca1e4632366228ef7a56cda1e83123491601e99a23e1715183e76fffefefe9f03fefffe304545a209998a1b841512128312831e25d52cc96b46460606f6f65034578ee46be4654f5654c5df6f2c818a9bea4545603d5b3d1818";
    }
}