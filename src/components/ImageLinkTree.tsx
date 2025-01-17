import { memo, useEffect, useRef } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

interface NodeType {
  id: string | number;
  label: string;
  shape: string;
  image: string;
  url?: string;
}

/** Network図 の Component */
export const ImageLinkTree = memo(() => {
  /** DOMを参照できるように useRef を使用して Element を取得する */
  const ref = useRef<HTMLDivElement>(null);
  let network: any;

  const tmpNodes: Array<NodeType> = [...Array(20).keys()].map((val) => {
    return {
      id: val,
      label: `ラベル_${val}`,
      shape: "circularImage", // これだけで、丸い写真になる！！
      image: `https://picsum.photos/50?random=${val}`,
      url: "https://visjs.github.io/vis-network/examples/",
    };
  });
  console.log(tmpNodes);

  const nodes = new DataSet(tmpNodes);

  const edges = [
    { from: 19, to: 10 },
    { from: 19, to: 11 },
    { from: 18, to: 8 },
    { from: 18, to: 7 },
    { from: 18, to: 6 },
    { from: 17, to: 8 },
    { from: 17, to: 7 },
    { from: 17, to: 6 },
    { from: 16, to: 10 },
    { from: 16, to: 9 },
    { from: 15, to: 5 },
    { from: 15, to: 4 },
    { from: 15, to: 3 },
    { from: 15, to: 2 },
    { from: 14, to: 6 },
    { from: 14, to: 4 },
    { from: 13, to: 4 },
    { from: 13, to: 3 },
    { from: 12, to: 3 },
    { from: 11, to: 3 },
    { from: 9, to: 3 },
    { from: 8, to: 3 },
    { from: 7, to: 3 },
    { from: 6, to: 3 },
    { from: 6, to: 2 },
    { from: 5, to: 2 },
    { from: 4, to: 2 },
    { from: 3, to: 1 },
    { from: 2, to: 1 },
  ];

  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    const data = {
      nodes: nodes,
      edges: edges,
    };
    const options = {
      // 最初にゆれてから形が定まる
      // physics: {
      //   stabilization: false,
      //   wind: { x: 0, y: 0 },
      // },
      layout: {
        // 階層構造 下に向かって流れる
        hierarchical: {
          shakeTowards: "roots",
          sortMethod: "directed",
        },
      },
      nodes: {
        // borderWidth: 3,
        color: {
          border: "dodgerblue",
          highlight: {
            border: "orange",
          },
          // マウスオーバーは効かないみたい
          // hover: {
          //   border: "red",
          // },
        },
      },
      edges: {
        smooth: {
          enabled: true,
          // type: "vertical",
          // type: "horizonal",
          type: "continuous",
          // type: "cubicBezier",  //くねる感じ
          roundness: 0.5,
        },
        arrows: { to: true },
        color: {
          color: "dodgerblue",
          highlight: "orange",
          // マウスオーバーは効かないみたい
          // hover: "red",
        },
      },
    };

    // Network が存在しない場合の処理
    if (!network && ref.current) {
      // Network Instance を作成して、DataをSetする => new Network(Dom領域, Data(Nodes & Edges), Options)
      network = new Network(ref.current, data, options);

      //アップから始まって、全体を表示
      network.once("beforeDrawing", function () {
        // id=1にフォーカス scaleはアップの大きさ
        network.focus(6, {
          scale: 8,
        });
      });
      network.once("afterDrawing", function () {
        network.fit({
          animation: {
            duration: 3000,
            easingFunction: "linear",
          },
        });
      });

      // Click イベントハンドラ を追加する
      network.on("doubleClick", (params: { nodes: number[] }) => {
        if (params.nodes.length > 0) {
          // ダブルクリックした Node のIDを取得する
          const nodeId = params.nodes[0];
          /** ダブルクリックした Node のIDから、該当の Nodeを取得する */
          const node = nodes.get(nodeId);
          // URLが存在する場合の処理
          if (node?.url) {
            /** クリックしたノードのURLを取得して、Openする */
            window.open(node.url, "_blank");
          }
        }
      });
    }
  }, []);

  return (
    <div>
      {/* Network図 を表示する領域 */}
      <div style={{ height: "100svh", width: "100%" }} ref={ref} />
    </div>
  );
});
