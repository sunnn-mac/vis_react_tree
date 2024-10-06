import { memo, useEffect, useRef } from "react";
import { Network } from "vis-network";

/** Network図 の Component */
export const SimpleTree2 = memo(() => {
  /** DOMを参照できるように useRef を使用して Element を取得する */
  const ref = useRef<HTMLDivElement>(null);
  let network: any;

  const nodes = [
    { id: 0, label: "0" },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6" },
    { id: 7, label: "7" },
    { id: 8, label: "8" },
    { id: 9, label: "9" },
    { id: 10, label: "10" },
    { id: 11, label: "11" },
    { id: 12, label: "12" },
    { id: 13, label: "13" },
    { id: 14, label: "14" },
    { id: 15, label: "15" },
    { id: 16, label: "16" },
    { id: 17, label: "17" },
    { id: 18, label: "18" },
  ];
  const edges = [
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
      layout: {
        hierarchical: {
          shakeTowards: "roots",
          sortMethod: "directed",
        },
      },
      edges: {
        // smooth: true,
        arrows: { to: true },
        // color: {
        //   highlight:'purple',
        //   // hover: '#ff0000',
        // },
        // color: {
        //   color:'#848484',
        //   highlight:'#848484',
        //   hover: '#848484',
        //   inherit: 'from',
        //   opacity:1.0
        // },
      },
    };
  
    // Network が存在しない場合の処理
    if (!network && ref.current) {
      // Network Instance を作成して、DataをSetする => new Network(Dom領域, Data(Nodes & Edges), Options)
      network = new Network(
        ref.current,
        data,
        options
      );
    }

    // // Click イベントハンドラ を追加する
    // network.on("click", (params: { nodes: number[] }) => {
    //   if (params.nodes.length > 0) {
    //     // クリックした Node のIDを取得する
    //     const nodeId = params.nodes[0];
    //     /** クリックした Node のIDから、該当の Nodeを取得する */
    //     const node = nodes.get(nodeId);
    //     // URLが存在する場合の処理
    //     if (node?.url) {
    //       /** クリックしたノードのURLを取得して、Openする */
    //       window.open(node.url, "_blank");
    //     }
    //   }
    // });
  }, []);

  return (
    <div>
      {/* Network図 を表示する領域 */}
      <div style={{ height: 800, width: "100%" }} ref={ref} />
    </div>
  );
});