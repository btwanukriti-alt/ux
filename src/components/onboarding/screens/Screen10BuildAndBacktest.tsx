// Figma node 2999:54133 — "Build and backtest a strategy, from one prompt"

export function Screen10BuildAndBacktest() {
  return (
<div className="backdrop-blur-[50.31px] bg-[rgba(0,21,139,0)] border border-[rgba(128,197,255,0.05)] border-solid overflow-clip relative rounded-[18.809px] shrink-0 w-[678px] h-[829px]" data-node-id="2999:54133" data-name="7">
        <div className="absolute h-[829px] left-[-1.43px] top-px w-[678px]" data-node-id="3004:70186" data-name="BG">
          <div className="absolute inset-[-24.19%_-49.77%_-30.84%_0]">
            <img alt="" className="block max-w-none size-full" src="/figma/onboarding/shared/bg-glow.svg" />
          </div>
        </div>
        <div className="absolute h-[287px] left-[-1.93px] top-[290.76px] w-[679px]" data-node-id="3004:73993" data-name="Graphic">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[287.337px] left-[calc(50%+0.56px)] top-[calc(50%+0.17px)] w-[368.126px]" data-node-id="2999:54608" data-name="Baactest">
            <div className="absolute backdrop-blur-[4px] border-[0.5px] border-[#4c6aa5] border-solid content-stretch flex gap-[40px] items-center left-[5.56px] px-[12px] py-[8px] rounded-[10px] top-0 w-[357px]" data-node-id="2999:54609" style={{ backgroundImage: "linear-gradient(180.00000078495196deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 357 46.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.3242e-7 -0.56447 13.691 -1.9733e-7 182.18 6.5936e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 357 46.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-9.0872e-7 -1.5471 30.314 -3.1373e-7 178.5 2.5088)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)" }}>
              <div className="content-stretch flex items-center p-[5px] relative rounded-[8px] shrink-0" data-node-id="2999:54610">
                <div className="relative shrink-0 size-[18.839px]" data-node-id="2999:54611" data-name="tdesign:ai-search">
                  <div className="absolute inset-[10.42%_12.06%_12.06%_12.5%]" data-node-id="I2999:54611;810:4927" data-name="Group">
                    <div className="absolute inset-[-19.22%_-10.88%_-10.59%_-7.69%]">
                      <img alt="" className="block max-w-none size-full" src="/figma/onboarding/shared/icon-ai-search.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-[0.5px] border-[#4c6aa5] border-solid content-stretch flex items-center p-[5px] relative rounded-[8px] shrink-0" data-node-id="2999:54612" style={{ backgroundImage: "linear-gradient(180.0000059827434deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 29.839 29.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-2.7785e-8 -0.3596 1.1444 -1.2571e-7 15.227 4.2005e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 29.839 29.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-7.5954e-8 -0.98557 2.5338 -1.9987e-7 14.92 1.5982)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)" }}>
                <div className="relative shrink-0 size-[18.839px]" data-node-id="2999:54613" data-name="ph:stack-simple-bold">
                  <div className="absolute inset-[9.38%_1.54%_12.5%_1.53%]" data-node-id="I2999:54613;744:3040" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/icon-stack.svg" />
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 size-[18.839px]" data-node-id="2999:54614" data-name="fluent:library-16-filled">
                <div className="absolute inset-[12.5%_6.25%]" data-node-id="I2999:54614;1344:23580" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/icon-library.svg" />
                </div>
              </div>
              <div className="relative shrink-0 size-[18.839px]" data-node-id="2999:54615" data-name="material-symbols:finance-mode-rounded">
                <div className="absolute inset-[8.33%_8.33%_12.29%_12.5%]" data-node-id="I2999:54615;792:4347" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/icon-finance-mode.svg" />
                </div>
              </div>
              <div className="relative shrink-0 size-[18.839px]" data-node-id="2999:54616" data-name="mingcute:bulb-line">
                <div className="absolute inset-[8.33%_16.67%_0.77%_16.67%]" data-node-id="I2999:54616;893:7461" data-name="Group">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/icon-bulb.svg" />
                </div>
              </div>
              <div className="relative shrink-0 size-[18.839px]" data-node-id="2999:54617" data-name="lucide:history">
                <div className="absolute inset-[12.5%]" data-node-id="I2999:54617;1344:23586" data-name="Group">
                  <div className="absolute inset-[-6.25%]">
                    <img alt="" className="block max-w-none size-full" src="/figma/onboarding/shared/icon-history.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-[#5985ff] border-[0.731px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[2.922px] items-center justify-center left-[269.73px] px-[5.844px] py-[2.922px] rounded-[2.922px] top-[125.82px] w-[86.806px]" data-node-id="2999:54618" data-name="Button">
              <div className="relative shrink-0 size-[9.497px]" data-node-id="I2999:54618;575:4084" data-name="iconoir:play-solid">
                <div className="absolute inset-[12.12%_15.15%_12.12%_21.21%]" data-node-id="I2999:54618;575:4084;756:3227" data-name="Vector">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/10-build-and-backtest/play-icon.svg" />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[11.689px] relative shrink-0 text-[8.77px] text-[color:#f1f6ff] whitespace-nowrap" data-node-id="I2999:54618;575:4085">
                Run Backtest
              </p>
            </div>
            <div className="absolute backdrop-blur-[4px] border-[#67d1ff] border-[0.732px] border-solid h-[124px] left-0 rounded-[11.707px] top-[169.67px] w-[353px]" data-node-id="2999:54619" style={{ backgroundImage: "linear-gradient(180.00000210158692deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 353 124' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.2869e-7 -1.4944 13.538 -5.2241e-7 180.13 1.7455e-7)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 353 124' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-8.9854e-7 -4.0956 29.974 -8.3056e-7 176.5 6.6416)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)" }}>
              <div className="absolute contents left-[9.66px] top-[9.47px]" data-node-id="2999:54620">
                <p className="[word-break:break-word] absolute font-semibold h-[8.199px] leading-[8.781px] left-[23.56px] text-[5.854px] text-[color:#f1f6ff] top-[10.2px] w-[48.293px]" data-node-id="2999:54621">{`Backtest Results `}</p>
                <div className="absolute left-[10.39px] size-[8.883px] top-[10.2px]" data-node-id="2999:54622" data-name="ph:stack-simple-bold">
                  <div className="absolute inset-[9.38%_1.54%_12.5%_1.53%]" data-node-id="I2999:54622;744:3040" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/10-build-and-backtest/stack-icon.svg" />
                  </div>
                </div>
              </div>
              <div className="absolute bg-[rgba(74,59,112,0.09)] content-stretch flex flex-col h-[36px] items-center justify-end left-[7.24px] overflow-clip px-[5.192px] py-[5.803px] rounded-[4.887px] top-[26.38px] w-[169px]" data-node-id="2999:54623" data-name="Entry Reason Distribution">
                <div className="content-stretch flex gap-[10px] h-[21.38px] items-end overflow-clip px-[3.665px] relative shrink-0" data-node-id="2999:54624" data-name="Bars">
                  <div className="bg-[#183585] h-[21.685px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54625" />
                  <div className="bg-[#0ff] h-[9.163px] relative rounded-[1.222px] shrink-0 w-[12.217px]" data-node-id="2999:54626" />
                  <div className="bg-[#183585] h-[7.33px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54627" />
                  <div className="bg-[#183585] h-[4.887px] relative rounded-[1.222px] shrink-0 w-[12.217px]" data-node-id="2999:54628" />
                  <div className="bg-[#183585] h-[15.882px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54629" />
                  <div className="bg-[#183585] h-[18.02px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54630" />
                </div>
              </div>
              <div className="absolute bg-[rgba(74,59,112,0.09)] content-stretch flex flex-col h-[37px] items-center justify-end left-[187.24px] overflow-clip px-[5.192px] py-[5.803px] rounded-[4.887px] top-[26.38px] w-[151px]" data-node-id="2999:54631" data-name="Entry Reason Distribution">
                <div className="content-stretch flex gap-[12px] h-[21.38px] items-end overflow-clip px-[3.665px] relative shrink-0" data-node-id="2999:54632" data-name="Bars">
                  <div className="bg-[#0ff] h-[9.163px] relative rounded-[1.222px] shrink-0 w-[12.217px]" data-node-id="2999:54633" />
                  <div className="bg-[#183585] h-[15.882px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54634" />
                  <div className="bg-[#183585] h-[4.887px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54635" />
                  <div className="bg-[#183585] h-[9.163px] relative rounded-[1.222px] shrink-0 w-[12.217px]" data-node-id="2999:54636" />
                  <div className="bg-[#183585] h-[15.882px] relative rounded-[1.222px] shrink-0 w-[12.523px]" data-node-id="2999:54637" />
                </div>
              </div>
              <div className="absolute contents left-[9.04px] top-[71.4px]" data-node-id="2999:54638">
                <div className="absolute bg-[rgba(74,59,112,0.09)] h-[41.35px] left-[9.78px] rounded-[2.927px] top-[72.13px] w-[329.196px]" data-node-id="2999:54639" />
                <div className="absolute contents left-[23.44px] top-[80.03px]" data-node-id="2999:54640">
                  <div className="absolute contents left-[23.44px] top-[80.03px]" data-node-id="2999:54641">
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[23.44px] rounded-[0.732px] top-[80.03px] w-[94.432px]" data-node-id="2999:54642" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[23.44px] rounded-[0.732px] top-[90.98px] w-[94.432px]" data-node-id="2999:54643" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[23.44px] rounded-[0.732px] top-[101.93px] w-[94.432px]" data-node-id="2999:54644" />
                  </div>
                  <div className="absolute contents left-[151.93px] top-[80.03px]" data-node-id="2999:54645">
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[151.93px] rounded-[0.732px] top-[80.03px] w-[32.155px]" data-node-id="2999:54646" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[151.93px] rounded-[0.732px] top-[90.98px] w-[32.155px]" data-node-id="2999:54647" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[151.93px] rounded-[0.732px] top-[101.93px] w-[32.155px]" data-node-id="2999:54648" />
                  </div>
                  <div className="absolute contents left-[196.78px] top-[80.03px]" data-node-id="2999:54649">
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[196.78px] rounded-[0.732px] top-[80.03px] w-[32.155px]" data-node-id="2999:54650" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[196.78px] rounded-[0.732px] top-[90.98px] w-[32.155px]" data-node-id="2999:54651" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[196.78px] rounded-[0.732px] top-[101.93px] w-[32.155px]" data-node-id="2999:54652" />
                  </div>
                  <div className="absolute contents left-[241.63px] top-[80.03px]" data-node-id="2999:54653">
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[241.63px] rounded-[0.732px] top-[80.03px] w-[32.155px]" data-node-id="2999:54654" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[241.63px] rounded-[0.732px] top-[90.98px] w-[32.155px]" data-node-id="2999:54655" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[241.63px] rounded-[0.732px] top-[101.93px] w-[32.155px]" data-node-id="2999:54656" />
                  </div>
                  <div className="absolute contents left-[286.48px] top-[80.03px]" data-node-id="2999:54657">
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[286.48px] rounded-[0.732px] top-[80.03px] w-[32.155px]" data-node-id="2999:54658" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[286.48px] rounded-[0.732px] top-[90.98px] w-[32.155px]" data-node-id="2999:54659" />
                    <div className="absolute bg-[#666fa0] h-[3.649px] left-[286.48px] rounded-[0.732px] top-[101.93px] w-[32.155px]" data-node-id="2999:54660" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute content-stretch flex gap-[6px] items-start left-[6.47px] top-[68.74px] w-[363px]" data-node-id="2999:54661">
              <div className="bg-[#5985ff] content-stretch flex flex-col items-center justify-center overflow-clip px-[7.4px] py-[4.554px] relative rounded-[34.154px] shrink-0 size-[18.5px]" data-node-id="2999:54662" data-name="User">
                <p className="[word-break:break-word] font-medium leading-[normal] relative shrink-0 text-[9.962px] text-[color:#f1f6ff] w-[7.115px]" data-node-id="2999:54663">
                  A
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[367px]" data-node-id="2999:54664" data-name="Layout:Prompt">
                <div className="h-[41.342px] relative shrink-0 w-full" data-node-id="2999:54665" data-name="Layout">
                  <p className="[word-break:break-word] absolute font-medium leading-[13.367px] left-0 text-[10.025px] text-[color:#f1f6ff] top-[2.5px] whitespace-nowrap" data-node-id="2999:54666">{`Buy when `}</p>
                  <div className="absolute bg-[rgba(0,85,209,0.1)] content-stretch flex items-start left-[52.34px] overflow-clip px-[6.684px] py-[1.671px] rounded-[16px] top-[0.83px]" data-node-id="2999:54667" data-name="Component 6">
                    <p className="[word-break:break-word] font-normal leading-[13.367px] relative shrink-0 text-[10.03px] text-[color:#80c5ff] whitespace-nowrap" data-node-id="I2999:54667;727:2933">
                      Regime
                    </p>
                  </div>
                  <p className="[word-break:break-word] absolute font-normal leading-[18.38px] left-[104.05px] text-[10.025px] text-[color:#f1f6ff] top-0 whitespace-nowrap" data-node-id="2999:54668">{` flips to breakout and price is above`}</p>
                  <p className="[word-break:break-word] absolute font-normal leading-[18.38px] left-[96px] text-[10.025px] text-[color:#f1f6ff] top-[23.34px] whitespace-nowrap" data-node-id="2999:54669">{`with `}</p>
                  <div className="absolute bg-[rgba(0,85,209,0.1)] content-stretch flex items-start left-[122.34px] overflow-clip px-[6.684px] py-[1.671px] rounded-[16px] top-[24.17px]" data-node-id="2999:54670" data-name="Component 8">
                    <p className="[word-break:break-word] font-normal leading-[13.367px] relative shrink-0 text-[10.03px] text-[color:#80c5ff] whitespace-nowrap" data-node-id="I2999:54670;727:2933">
                      fragility
                    </p>
                  </div>
                  <p className="[word-break:break-word] absolute font-medium leading-[13.367px] left-[172.53px] text-[10.025px] text-[color:#f1f6ff] top-[26.34px] whitespace-nowrap" data-node-id="2999:54671">
                    under 0.5, take profit 2%, stop 1%
                  </p>
                  <div className="absolute bg-[rgba(0,85,209,0.1)] content-stretch flex items-start left-0 overflow-clip px-[6.684px] py-[1.671px] rounded-[16px] top-[23.17px]" data-node-id="2999:54672" data-name="Component 7">
                    <p className="[word-break:break-word] font-normal leading-[13.367px] relative shrink-0 text-[10.03px] text-[color:#80c5ff] whitespace-nowrap" data-node-id="I2999:54672;727:2933">
                      value-area-high
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[36px] left-[calc(50%+0.1px)] text-[28px] text-[color:#f1f6ff] text-center top-[130px] w-[474px]" data-node-id="2999:54673">
          Build and backtest a strategy, from one prompt
        </p>
      </div>
  );
}
