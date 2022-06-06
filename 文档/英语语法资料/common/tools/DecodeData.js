// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    statics: {

        Decode(msg) {
            var i = 0;
            var j = 0;
            var result = "";
            var a3 = new Array('', '', '');
            var a4 = new Array('', '', '', '');

            var input_len = msg.length;
            var pos = 0;
            while (input_len--) {
                if (msg.charAt(pos) == "=")
                    break;
                a4[i++] = msg.charAt(pos++);
                if (i == 4) {
                    for (i = 0; i < 4; i++) {
                        a4[i] = this.b64_lookup(a4[i]);
                    }

                    this.a4_to_a3(a3, a4);

                    for (i = 0; i < 3; i++) {
                        result.concat(a3[i]);
                    }

                    i = 0;
                }
            }

            if (i) {
                for (j = i; j < 4; j++) {
                    a4[j] = '\0';
                }

                for (j = 0; j < 4; j++) {
                    a4[j] = this.b64_lookup(a4[j]);
                }

                this.a4_to_a3(a3, a4);

                for (j = 0; j < i-1; j++) {
                    result.concat(a3[j]);
                }
            }

            return result;
        },

        DecodedLength(msg) {
            var numEq = 0;
            var n = msg.length;

            for (var i = n - 1; i == "="; i--) {
                ++numEq;
            }
            return ((6 * n) / 8) - numEq;
        },

        b64_lookup(c) {
            if (c >= 'A' && c <= 'Z') return c - 'A';
            if (c >= 'a' && c <= 'z') return c - 71;
            if (c >= '0' && c <= '9') return c + 4;
            if (c == '+') return 62;
            if (c == '/') return 63;
            return 255;
        },

        a4_to_a3(a3, a4) {
            a3[0] = (a4[0] << 2) + ((a4[1] & 0x30) >> 4);
            a3[1] = ((a4[1] & 0xf) << 4) + ((a4[2] & 0x3c) >> 2);
            a3[2] = ((a4[2] & 0x3) << 6) + a4[3];
        }
    },
});
